import React, { useState, ChangeEvent, useEffect } from 'react';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import Card from '../components/Card';
import { NavLink } from 'react-router-dom';
import { fetchHome, saveHome, uploadFile, HomeContent, HomeButton, Venture, LogoItem } from '../lib/cms';

interface AdminPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const DEFAULT_HOME_CONTENT: HomeContent = {
  hero_title: '',
  hero_tags: [],
  about: { title: '', body: '' },
  operator: { title: '', body: '' },
  socials: [],
  hero_buttons: [],
  ventures: [],
  logos: [],
};

// --- Helper Components ---
const FormInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label htmlFor={props.id || props.name} className="block text-sm font-medium mb-1">{label}</label>
    <input {...props} className={`w-full h-12 px-4 rounded-lg border focus:outline-none focus:ring-2 ${props.className || ''}`} style={{
      backgroundColor: 'var(--md-sys-color-surface)',
      borderColor: 'var(--md-sys-color-outline)',
      color: 'var(--md-sys-color-on-surface)',
      '--tw-ring-color': 'var(--md-sys-color-primary)'
    } as React.CSSProperties} />
  </div>
);

const FormTextarea = ({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div>
    <label htmlFor={props.id || props.name} className="block text-sm font-medium mb-1">{label}</label>
    <textarea {...props} rows={5} className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 ${props.className || ''}`} style={{
      backgroundColor: 'var(--md-sys-color-surface)',
      borderColor: 'var(--md-sys-color-outline)',
      color: 'var(--md-sys-color-on-surface)',
      '--tw-ring-color': 'var(--md-sys-color-primary)'
    } as React.CSSProperties}></textarea>
  </div>
);


const LoginScreen = ({ handleLogin }: { handleLogin: (e: React.FormEvent) => void }) => (
  <div className="max-w-md mx-auto">
    <Card className="p-8">
      <h1 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--md-sys-color-on-surface)' }}>Admin Login</h1>
      <p className="text-center text-sm mb-6" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>This is a UI demonstration.</p>
      <form onSubmit={handleLogin} className="space-y-6">
        <FormInput label="Username" type="text" id="username" defaultValue="admin" />
        <FormInput label="Password" type="password" id="password" defaultValue="password" />
        <Button type="submit" variant="ghost" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  </div>
);


const AdminPage: React.FC<AdminPageProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);
  const [uploadStates, setUploadStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const cmsData = await fetchHome();
      setContent(cmsData || DEFAULT_HOME_CONTENT);
      setIsLoading(false);
    };
    if (isLoggedIn) {
        loadContent();
    } else {
        setIsLoading(false);
    }
  }, [isLoggedIn]);

  const handleGenericChange = (path: string, value: any) => {
    if (!content) return;
    const keys = path.split('.');
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); // Deep copy
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleListChange = <T,>(listName: keyof HomeContent, index: number, field: keyof T, value: any) => {
    if (!content) return;
    const list = (content[listName] as T[] | undefined) || [];
    const updatedList = [...list];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setContent(prev => ({ ...prev!, [listName]: updatedList }));
  };
  
  // FIX: Converted `addListItem` to a generic function to ensure type safety when adding
  // new items to arrays in the state. This prevents type mismatches during state updates.
  const addListItem = <T,>(listName: keyof HomeContent, newItem: T) => {
    if (!content) return;
    setContent(prev => {
        if (!prev) return null;
        const list = (prev[listName] as T[] | undefined) || [];
        return { ...prev, [listName]: [...list, newItem] };
    });
  };

  const removeListItem = (listName: keyof HomeContent, index: number) => {
     if (!content) return;
    const list = (content[listName] as any[] | undefined) || [];
    setContent(prev => ({ ...prev!, [listName]: list.filter((_, i) => i !== index) }));
  };

  const handleLogoUpload = async (index: number, file: File) => {
    if (!file) return;
    setUploadStates(prev => ({ ...prev, [index]: true }));
    try {
      const { url } = await uploadFile(file);
      handleListChange<LogoItem>('logos', index, 'logoUrl', url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Logo upload failed. Please try again.");
    } finally {
      setUploadStates(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleSaveAll = async () => {
    if (!content) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await saveHome(content);
      setSaveStatus('success');
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  if (isLoading) {
    return <div className="text-center">Loading Admin Panel...</div>;
  }

  if (!isLoggedIn) {
    return <LoginScreen handleLogin={handleLogin} />;
  }
  
  if (!content) {
    return <div className="text-center text-red-500">Failed to load content. Please refresh.</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--md-sys-color-primary)' }}>Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleSaveAll} variant="filled" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button onClick={onLogout} variant="filled-to-ghost">Logout</Button>
        </div>
      </div>
      
      {saveStatus === 'success' && <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)' }}>✅ Content saved successfully!</div>}
      {saveStatus === 'error' && <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--md-sys-color-error-container)', color: 'var(--md-sys-color-on-error-container)' }}>❌ There was an error saving. Please try again.</div>}

      {/* --- Section: Hero --- */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--md-sys-color-on-surface)' }}>Hero Section</h2>
        <FormInput label="Hero Title" type="text" value={content.hero_title} onChange={e => handleGenericChange('hero_title', e.target.value)} />
        <FormInput label="Profile Roles (comma-separated)" type="text" value={(content.hero_tags || []).join(', ')} onChange={e => handleGenericChange('hero_tags', e.target.value.split(',').map(t => t.trim()))} />
      </Card>
      
      {/* --- Section: About Cards --- */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--md-sys-color-on-surface)' }}>About Card 1</h2>
          <FormInput label="Title" value={content.about.title} onChange={e => handleGenericChange('about.title', e.target.value)} />
          <FormTextarea label="Body" value={content.about.body} onChange={e => handleGenericChange('about.body', e.target.value)} />
        </Card>
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--md-sys-color-on-surface)' }}>About Card 2</h2>
          <FormInput label="Title" value={content.operator.title} onChange={e => handleGenericChange('operator.title', e.target.value)} />
          <FormTextarea label="Body" value={content.operator.body} onChange={e => handleGenericChange('operator.body', e.target.value)} />
        </Card>
      </div>
      
      {/* --- Section: Social Links --- */}
      <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>Social Links</h2>
          {(content.socials || []).map((item, index) => (
            <div key={index} className="flex items-end gap-4 p-3 rounded-lg" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
              <div className="flex-grow">
                  <FormInput label="Name" type="text" value={item.name} onChange={e => handleListChange('socials', index, 'name', e.target.value)} />
              </div>
              <div className="flex-grow">
                  <FormInput label="URL" type="text" value={item.url} onChange={e => handleListChange('socials', index, 'url', e.target.value)} />
              </div>
              <Button variant="ghost" onClick={() => removeListItem('socials', index)} aria-label="Remove item">
                <span className="material-symbols-outlined">delete</span>
              </Button>
            </div>
          ))}
          <Button variant="outlined" onClick={() => addListItem('socials', { name: '', url: '' })}>Add Social Link</Button>
      </Card>

      {/* --- Section: Hero Buttons --- */}
      <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>Hero Buttons</h2>
          {(content.hero_buttons || []).map((item, index) => (
            <div key={index} className="flex items-end gap-4 p-3 rounded-lg" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
                <div className="flex-grow">
                  <FormInput label="Label" type="text" value={item.label} onChange={e => handleListChange<HomeButton>('hero_buttons', index, 'label', e.target.value)} />
                </div>
                <div className="flex-grow">
                  <FormInput label="URL" type="text" value={item.url} onChange={e => handleListChange<HomeButton>('hero_buttons', index, 'url', e.target.value)} />
                </div>
              <Button variant="ghost" onClick={() => removeListItem('hero_buttons', index)} aria-label="Remove item">
                <span className="material-symbols-outlined">delete</span>
              </Button>
            </div>
          ))}
          <Button variant="outlined" onClick={() => addListItem<HomeButton>('hero_buttons', { label: '', url: '' })}>Add Hero Button</Button>
      </Card>

      {/* --- Section: Ventures --- */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Ventures</h2>
        {(content.ventures || []).map((item, index) => (
          <div key={index} className="p-4 space-y-3 rounded-lg border" style={{borderColor: 'var(--md-sys-color-outline)'}}>
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Venture #{index + 1}</h3>
                <Button variant="ghost" onClick={() => removeListItem('ventures', index)} aria-label="Remove venture">
                    <span className="material-symbols-outlined">delete</span>
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormInput label="Title" value={item.title} onChange={e => handleListChange<Venture>('ventures', index, 'title', e.target.value)} />
                <FormInput label="Subtitle" value={item.subtitle || ''} onChange={e => handleListChange<Venture>('ventures', index, 'subtitle', e.target.value)} />
            </div>
            <FormTextarea label="Body" value={item.body || ''} onChange={e => handleListChange<Venture>('ventures', index, 'body', e.target.value)} />
            <div className="grid md:grid-cols-2 gap-4">
                <FormInput label="CTA Label" value={item.ctaLabel || ''} onChange={e => handleListChange<Venture>('ventures', index, 'ctaLabel', e.target.value)} />
                <FormInput label="CTA URL" value={item.ctaUrl || ''} onChange={e => handleListChange<Venture>('ventures', index, 'ctaUrl', e.target.value)} />
            </div>
          </div>
        ))}
        {/* FIX: Corrected the call to the now generic `addListItem` function by providing the <Venture> type. */}
        <Button variant="outlined" onClick={() => addListItem<Venture>('ventures', { title: '', subtitle: '', body: '', ctaLabel: '', ctaUrl: '' })}>Add Venture</Button>
      </Card>
      
      {/* --- Section: Logos --- */}
      <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Logos</h2>
           {(content.logos || []).map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg border" style={{borderColor: 'var(--md-sys-color-outline)'}}>
                    <div className="w-24 h-16 flex items-center justify-center rounded-lg" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
                        {item.logoUrl ? <img src={item.logoUrl} alt={item.name || `Logo ${index+1}`} className="max-h-12 max-w-full" /> : <span className="text-xs text-center">No Image</span>}
                    </div>
                    <div className="flex-grow space-y-3">
                         <FormInput label="Name (optional)" value={item.name || ''} onChange={e => handleListChange<LogoItem>('logos', index, 'name', e.target.value)} />
                         <FormInput label="URL (optional)" value={item.url || ''} onChange={e => handleListChange<LogoItem>('logos', index, 'url', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Button as="label" variant="tonal" className="relative cursor-pointer">
                            {uploadStates[index] ? 'Uploading...' : 'Upload'}
                            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={uploadStates[index]} onChange={e => e.target.files && handleLogoUpload(index, e.target.files[0])} />
                        </Button>
                        <Button variant="ghost" onClick={() => removeListItem('logos', index)}><span className="material-symbols-outlined">delete</span></Button>
                    </div>
                </div>
           ))}
           {/* FIX: Corrected the call to the now generic `addListItem` function by providing the <LogoItem> type. */}
           <Button variant="outlined" onClick={() => addListItem<LogoItem>('logos', { logoUrl: '', name: '', url: '' })}>Add Logo</Button>
      </Card>

      {/* --- Section: Manage Posts --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--md-sys-color-on-surface)' }}>Manage Content Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.slug} className="p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4" style={{ backgroundColor: 'var(--md-sys-color-surface)' }}>
              <div className="text-center sm:text-left">
                <p className="font-bold text-lg" style={{ color: 'var(--md-sys-color-on-surface)' }}>{post.title}</p>
                <p className="text-sm" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  {post.type} - {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button as={NavLink} to={`/post/${post.slug}`} variant="ghost">View</Button>
                <Button variant="ghost" disabled>Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminPage;