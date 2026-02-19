import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'freelancer' | 'client' | 'both';
  bio: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'both',
    bio: '',
  });

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('workfox_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (user) {
      // Initialize with Google data
      setProfile({
        name: user.name,
        email: user.email,
        phone: '',
        address: '',
        role: 'both',
        bio: '',
      });
    }
  }, [user]);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('workfox_profile', JSON.stringify(profile));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload from localStorage
    const savedProfile = localStorage.getItem('workfox_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="card text-center">
              <img
                src={user?.picture}
                alt={profile.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-100"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
              <p className="text-gray-600 mb-4">{profile.email}</p>
              <div className="inline-flex px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {profile.role === 'freelancer' && '👨‍💻 Freelancer'}
                {profile.role === 'client' && '💼 Client'}
                {profile.role === 'both' && '🌟 Freelancer & Client'}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button onClick={handleCancel} className="btn-secondary text-sm">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="btn-primary text-sm">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="input"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="input bg-gray-100 cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed (linked to Google account)
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="label">Address</label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                    className="input min-h-[80px]"
                    placeholder="Enter your full address"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="label">I am a *</label>
                  <select
                    value={profile.role}
                    onChange={(e) =>
                      setProfile({ ...profile, role: e.target.value as UserProfile['role'] })
                    }
                    disabled={!isEditing}
                    className="input"
                  >
                    <option value="freelancer">Freelancer (I complete tasks)</option>
                    <option value="client">Client (I post tasks)</option>
                    <option value="both">Both (Freelancer & Client)</option>
                  </select>
                </div>

                {/* Bio */}
                <div>
                  <label className="label">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    className="input min-h-[120px]"
                    placeholder="Tell us about yourself, your skills, and experience..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {profile.bio.length}/500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="card mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Account Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">Tasks Created</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">Tasks Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">ALGO Earned</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">ALGO Spent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
