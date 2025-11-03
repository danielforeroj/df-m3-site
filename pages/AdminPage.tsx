import React, { useState, ChangeEvent } from 'react';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import Card from '../components/Card';
import { NavLink } from 'react-router-dom';
import { HomePageData, CompanyLogo, SocialLink, Venture, CtaButton } from '../types';

interface AdminPageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  homepageData: HomePageData;
  setHomepageData: React.Dispatch<React.SetStateAction<HomePageData>>;
}

const AdminPage: React.FC<AdminPageProps> = ({ isLoggedIn, onLogin, onLogout, homepageData, setHomepageData }) => {
  
  // Local state for forms
  const [aboutCard1, setAboutCard1] = useState(homepageData.aboutCard1);
  const [aboutCard2, setAboutCard2] = useState(homepageData.aboutCard2);
  const [profileRoles, setProfileRoles] = useState(homepageData.profileRoles);
  const [newRole, setNewRole] = useState('');
  const [socialLinks, setSocialLinks] = useState(homepageData.socialLinks);
  const [newSocialLink, setNewSocialLink] = useState({ name: '', url: ''});
  const [ventures, setVentures] = useState(homepageData.ventures);
  const [editingVenture, setEditingVenture] = useState<Venture | null>(null);
  const [heroButton1, setHeroButton1] = useState(homepageData.heroButton1);
  const [heroButton2, setHeroButton2] = useState(homepageData.heroButton2);


  // --- Handlers for updating global state ---
  const handleUpdateHomepageData = <T extends keyof HomePageData>(field: T, value: HomePageData[T]) => {
    setHomepageData(prev => ({ ...prev, [field]: value }));
  };
  
  // --- Logo Handlers ---
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogo: CompanyLogo = {
          name: file.name.replace('.png', ''),
          logo: reader.result as string,
        };
        handleUpdateHomepageData('logos', [...homepageData.logos, newLogo]);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid PNG file.');
    }
  };

  const handleRemoveLogo = (logoNameToRemove: string) => {
    const updatedLogos = homepageData.logos.filter(logo => logo.name !== logoNameToRemove);
    handleUpdateHomepageData('logos', updatedLogos);
  };
  
  // --- Role Handlers ---
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRole.trim() && !profileRoles.includes(newRole.trim())) {
      const updatedRoles = [...profileRoles, newRole.trim()];
      setProfileRoles(updatedRoles);
      handleUpdateHomepageData('profileRoles', updatedRoles);
      setNewRole('');
    }
  };

  const handleRemoveRole = (roleToRemove: string) => {
    const updatedRoles = profileRoles.filter(role => role !== roleToRemove);
    setProfileRoles(updatedRoles);
    handleUpdateHomepageData('profileRoles', updatedRoles);
  };
  
  // --- Social Link Handlers ---
    const handleAddSocialLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSocialLink.name.trim() && newSocialLink.url.trim()) {
            const newLink: SocialLink = { ...newSocialLink, id: Date.now().toString() };
            const updatedLinks = [...socialLinks, newLink];
            setSocialLinks(updatedLinks);
            handleUpdateHomepageData('socialLinks', updatedLinks);
            setNewSocialLink({ name: '', url: '' });
        }
    };

    const handleRemoveSocialLink = (id: string) => {
        const updatedLinks = socialLinks.filter(link => link.id !== id);
        setSocialLinks(updatedLinks);
        handleUpdateHomepageData('socialLinks', updatedLinks);
    };

  // --- Venture Handlers ---
    const handleSaveVenture = (ventureToSave: Venture) => {
        let updatedVentures;
        if (ventures.find(v => v.id === ventureToSave.id)) {
            updatedVentures = ventures.map(v => v.id === ventureToSave.id ? ventureToSave : v);
        } else {
            updatedVentures = [...ventures, ventureToSave];
        }
        setVentures(updatedVentures);
        handleUpdateHomepageData('ventures', updatedVentures);
        setEditingVenture(null);
    };

    const handleRemoveVenture = (id: string) => {
        const updatedVentures = ventures.filter(v => v.id !== id);
        setVentures(updatedVentures);
        handleUpdateHomepageData('ventures', updatedVentures);
    };

  // --- Mock Login ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  
  const FormInput = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input {...props} className="w-full h-12 px-4 rounded-lg border focus:outline-none focus:ring-2" style={{
            backgroundColor: 'var(--md-sys-color-surface)',
            borderColor: 'var(--md-sys-color-outline)',
            color: 'var(--md-sys-color-on-surface)',
            '--tw-ring-color': 'var(--md-sys-color-primary)'
        } as React.CSSProperties} />
    </div>
  );
  
  const FormTextarea = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <textarea {...props} rows={4} className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2" style={{
            backgroundColor: 'var(--md-sys-color-surface)',
            borderColor: 'var(--md-sys-color-outline)',
            color: 'var(--md-sys-color-on-surface)',
            '--tw-ring-color': 'var(--md-sys-color-primary)'
        } as React.CSSProperties}></textarea>
    </div>
  );

  const LoginScreen = () => (
    <div className="max-w-md mx-auto">
        <Card className="p-8">
            <h1 className="text-2xl font-bold text-center mb-2" style={{color: 'var(--md-sys-color-on-surface)'}}>Admin Login</h1>
            <p className="text-center text-sm mb-6" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>This is a UI demonstration.</p>
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

  const Dashboard = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight" style={{color: 'var(--md-sys-color-primary)'}}>Dashboard</h1>
        <Button onClick={onLogout} variant="filled-to-ghost">Logout</Button>
      </div>
       <p className="text-sm rounded-lg p-3 inline-flex gap-2" style={{backgroundColor: 'var(--md-sys-color-tertiary-container)', color: 'var(--md-sys-color-on-tertiary-container)'}}>
            <span className="material-symbols-outlined">info</span>
            Changes are not saved in this demo and will reset on page reload.
       </p>

      {/* --- Section: Logo Slider --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Logos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
          {homepageData.logos.map(logo => (
            <div key={logo.name} className="relative group p-2 border rounded-lg flex items-center justify-center" style={{borderColor: 'var(--md-sys-color-outline)'}}>
              <img src={logo.logo} alt={logo.name} className="h-8 grayscale" />
              <button 
                onClick={() => handleRemoveLogo(logo.name)} 
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${logo.name} logo`}
                style={{backgroundColor: 'var(--md-sys-color-error)', color: 'var(--md-sys-color-on-error)'}}
              >
                 <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          ))}
        </div>
        <div>
            <label htmlFor="logo-upload" className="block text-sm font-medium mb-1">Upload New Logo (PNG only)</label>
            <input type="file" id="logo-upload" accept="image/png" onChange={handleLogoUpload} 
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold" />
        </div>
      </Card>
      
      {/* --- Section: About Cards --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>{aboutCard1.title}</h2>
            <form className="space-y-4" onSubmit={e => {e.preventDefault(); handleUpdateHomepageData('aboutCard1', aboutCard1)}}>
              <FormInput label="Title" type="text" value={aboutCard1.title} onChange={e => setAboutCard1({...aboutCard1, title: e.target.value})} />
              <FormTextarea label="Subtitle" value={aboutCard1.subtitle} onChange={e => setAboutCard1({...aboutCard1, subtitle: e.target.value})} />
              <FormTextarea label="Text" value={aboutCard1.text} onChange={e => setAboutCard1({...aboutCard1, text: e.target.value})} />
              <Button type="submit" variant="ghost">Save Card 1</Button>
            </form>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>{aboutCard2.title}</h2>
            <form className="space-y-4" onSubmit={e => {e.preventDefault(); handleUpdateHomepageData('aboutCard2', aboutCard2)}}>
              <FormInput label="Title" type="text" value={aboutCard2.title} onChange={e => setAboutCard2({...aboutCard2, title: e.target.value})} />
              <FormTextarea label="Text" value={aboutCard2.subtitle} onChange={e => setAboutCard2({...aboutCard2, subtitle: e.target.value})} />
              <Button type="submit" variant="ghost">Save Card 2</Button>
            </form>
          </Card>
      </div>
      
      {/* --- Section: Profile Roles --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Edit Profile Roles</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {profileRoles.map(role => (
            <div key={role} className="flex items-center rounded-lg" style={{ backgroundColor: 'var(--md-sys-color-secondary-container)', color: 'var(--md-sys-color-on-secondary-container)' }}>
              <span className="pl-3 pr-2 py-1.5 text-sm font-medium">{role}</span>
              <button onClick={() => handleRemoveRole(role)} className="mr-1 p-1 rounded-full hover:bg-black/10 active:bg-black/20 focus:outline-none"><span className="material-symbols-outlined text-base align-middle">close</span></button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddRole} className="flex items-center gap-4">
          <FormInput label="Add new role" type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Add a new role" className="flex-grow" />
          <Button type="submit" variant="ghost">Add Role</Button>
        </form>
      </Card>
      
      {/* --- Section: Social Links --- */}
      <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Social Links</h2>
          <div className="space-y-2 mb-4">
            {socialLinks.map(link => (
                <div key={link.id} className="flex items-center justify-between p-2 rounded-lg" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
                    <span>{link.name} - <em className="text-sm">{link.url}</em></span>
                    <button onClick={() => handleRemoveSocialLink(link.id)} className="p-1 text-red-500 rounded-full hover:bg-black/10"><span className="material-symbols-outlined text-base">delete</span></button>
                </div>
            ))}
          </div>
          <form onSubmit={handleAddSocialLink} className="flex items-end gap-4">
              <div className="flex-grow"><FormInput label="Link Name" type="text" value={newSocialLink.name} onChange={e => setNewSocialLink({...newSocialLink, name: e.target.value})} /></div>
              <div className="flex-grow"><FormInput label="URL" type="text" value={newSocialLink.url} onChange={e => setNewSocialLink({...newSocialLink, url: e.target.value})} /></div>
              <Button type="submit" variant="ghost">Add Link</Button>
          </form>
      </Card>

      {/* --- Section: Hero CTA Buttons --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Hero Buttons</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <form className="p-4 border rounded-lg space-y-4" style={{borderColor: 'var(--md-sys-color-outline)'}} onSubmit={(e) => { e.preventDefault(); handleUpdateHomepageData('heroButton1', heroButton1); }}>
            <h3 className="font-bold">Primary Button</h3>
            <FormInput label="Text" value={heroButton1.text} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton1({...heroButton1, text: e.target.value})} />
            <FormInput label="URL" value={heroButton1.url} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton1({...heroButton1, url: e.target.value})} />
            <FormInput label="Icon Name (Optional)" value={heroButton1.icon || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton1({...heroButton1, icon: e.target.value})} />
            <div>
              <label className="block text-sm font-medium mb-1">Variant</label>
              <select value={heroButton1.variant} onChange={(e: ChangeEvent<HTMLSelectElement>) => setHeroButton1({...heroButton1, variant: e.target.value as CtaButton['variant']})} className="w-full h-12 px-4 rounded-lg border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--md-sys-color-surface)', borderColor: 'var(--md-sys-color-outline)', color: 'var(--md-sys-color-on-surface)', '--tw-ring-color': 'var(--md-sys-color-primary)'} as React.CSSProperties}>
                <option value="filled">Filled</option><option value="tonal">Tonal</option><option value="outlined">Outlined</option><option value="ghost">Ghost</option><option value="filled-to-ghost">Filled to Ghost</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="btn1-enabled" checked={heroButton1.enabled} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton1({...heroButton1, enabled: e.target.checked})} className="h-5 w-5 rounded focus:ring-2" style={{'--tw-ring-color': 'var(--md-sys-color-primary)'} as React.CSSProperties} />
              <label htmlFor="btn1-enabled" className="text-sm font-medium">Enabled</label>
            </div>
            <Button type="submit" variant="ghost">Save Primary Button</Button>
          </form>
          <form className="p-4 border rounded-lg space-y-4" style={{borderColor: 'var(--md-sys-color-outline)'}} onSubmit={(e) => { e.preventDefault(); handleUpdateHomepageData('heroButton2', heroButton2); }}>
            <h3 className="font-bold">Secondary Button</h3>
            <FormInput label="Text" value={heroButton2.text} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton2({...heroButton2, text: e.target.value})} />
            <FormInput label="URL" value={heroButton2.url} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton2({...heroButton2, url: e.target.value})} />
            <FormInput label="Icon Name (Optional)" value={heroButton2.icon || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton2({...heroButton2, icon: e.target.value})} />
            <div>
              <label className="block text-sm font-medium mb-1">Variant</label>
              <select value={heroButton2.variant} onChange={(e: ChangeEvent<HTMLSelectElement>) => setHeroButton2({...heroButton2, variant: e.target.value as CtaButton['variant']})} className="w-full h-12 px-4 rounded-lg border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--md-sys-color-surface)', borderColor: 'var(--md-sys-color-outline)', color: 'var(--md-sys-color-on-surface)', '--tw-ring-color': 'var(--md-sys-color-primary)'} as React.CSSProperties}>
                <option value="filled">Filled</option><option value="tonal">Tonal</option><option value="outlined">Outlined</option><option value="ghost">Ghost</option><option value="filled-to-ghost">Filled to Ghost</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="btn2-enabled" checked={heroButton2.enabled} onChange={(e: ChangeEvent<HTMLInputElement>) => setHeroButton2({...heroButton2, enabled: e.target.checked})} className="h-5 w-5 rounded focus:ring-2" style={{'--tw-ring-color': 'var(--md-sys-color-primary)'} as React.CSSProperties} />
              <label htmlFor="btn2-enabled" className="text-sm font-medium">Enabled</label>
            </div>
            <Button type="submit" variant="ghost">Save Secondary Button</Button>
          </form>
        </div>
      </Card>

      {/* --- Section: Ventures --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Ventures</h2>
        <div className="space-y-4">
            {ventures.map(v => (
                <div key={v.id} className="p-4 rounded-lg flex justify-between items-center" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
                    <div>
                        <p className="font-bold">{v.title}</p>
                        <p className="text-sm text-gray-500">{v.cta}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setEditingVenture(v)}>Edit</Button>
                        <Button variant="ghost" onClick={() => handleRemoveVenture(v.id)}>Delete</Button>
                    </div>
                </div>
            ))}
             <Button variant="outlined" onClick={() => setEditingVenture({id: Date.now().toString(), title: '', description: '', cta: '', url: '#'})}>Add New Venture</Button>
        </div>
      </Card>
      
      {editingVenture && (
         <Card className="p-6 mt-6">
             <h3 className="text-xl font-bold mb-4">{editingVenture.title ? "Edit Venture" : "Add New Venture"}</h3>
             <form className="space-y-4" onSubmit={e => {e.preventDefault(); handleSaveVenture(editingVenture)}}>
                <FormInput label="Title" value={editingVenture.title} onChange={e => setEditingVenture({...editingVenture, title: e.target.value})} />
                <FormTextarea label="Description" value={editingVenture.description} onChange={e => setEditingVenture({...editingVenture, description: e.target.value})} />
                <FormInput label="CTA Text" value={editingVenture.cta} onChange={e => setEditingVenture({...editingVenture, cta: e.target.value})} />
                <FormInput label="URL" value={editingVenture.url} onChange={e => setEditingVenture({...editingVenture, url: e.target.value})} />
                <div className="flex gap-4">
                    <Button type="submit" variant="ghost">Save Venture</Button>
                    <Button variant="outlined" onClick={() => setEditingVenture(null)}>Cancel</Button>
                </div>
             </form>
         </Card>
      )}

      {/* --- Section: Manage Posts --- */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--md-sys-color-on-surface)'}}>Manage Content Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.slug} className="p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4" style={{backgroundColor: 'var(--md-sys-color-surface)'}}>
              <div className="text-center sm:text-left">
                <p className="font-bold text-lg" style={{color: 'var(--md-sys-color-on-surface)'}}>{post.title}</p>
                <p className="text-sm" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                  {post.type} - {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button as={NavLink} to={`/post/${post.slug}`} variant="ghost">View</Button>
                <Button variant="ghost">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <LoginScreen />;
};

export default AdminPage;