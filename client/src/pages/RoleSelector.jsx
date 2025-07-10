import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Briefcase, Code, Database, Server, BarChart3, Settings, Users, Zap, Shield, Globe, Smartphone, Cloud, Brain, Star, Target as SkillTarget } from 'lucide-react';

const roles = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    icon: Code,
    description: 'React, Vue, Angular, UI/UX',
    color: 'from-blue-500 to-cyan-600',
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript']
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    icon: Server,
    description: 'APIs, Databases, Server Logic',
    color: 'from-green-500 to-emerald-600',
    skills: ['Node.js', 'Python', 'Java', 'Databases', 'APIs']
  },
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    icon: Zap,
    description: 'End-to-end Development',
    color: 'from-purple-500 to-pink-600',
    skills: ['Frontend', 'Backend', 'DevOps', 'Databases', 'APIs']
  },
  {
    id: 'data',
    name: 'Data Analyst',
    icon: BarChart3,
    description: 'Data Analysis & Visualization',
    color: 'from-orange-500 to-red-600',
    skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistics']
  },
  {
    id: 'devops',
    name: 'DevOps Engineer',
    icon: Settings,
    description: 'Infrastructure & Deployment',
    color: 'from-indigo-500 to-purple-600',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux']
  },
  {
    id: 'product',
    name: 'Product Manager',
    icon: Users,
    description: 'Product Strategy & Management',
    color: 'from-teal-500 to-cyan-600',
    skills: ['Strategy', 'User Research', 'Agile', 'Analytics', 'Leadership']
  },
  {
    id: 'mobile',
    name: 'Mobile Developer',
    icon: Smartphone,
    description: 'iOS & Android Development',
    color: 'from-pink-500 to-rose-600',
    skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI', 'APIs']
  },
  {
    id: 'security',
    name: 'Security Engineer',
    icon: Shield,
    description: 'Cybersecurity & Protection',
    color: 'from-red-500 to-pink-600',
    skills: ['Network Security', 'Penetration Testing', 'Cryptography', 'Compliance']
  },
  {
    id: 'cloud',
    name: 'Cloud Engineer',
    icon: Cloud,
    description: 'Cloud Infrastructure & Services',
    color: 'from-blue-500 to-indigo-600',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Microservices']
  },
  {
    id: 'qa',
    name: 'QA Engineer',
    icon: Database,
    description: 'Testing & Quality Assurance',
    color: 'from-yellow-500 to-orange-600',
    skills: ['Automation Testing', 'Manual Testing', 'Selenium', 'JIRA', 'Test Planning']
  }
];

const skills = [
  {
    id: 'technical',
    name: 'Technical Skills',
    icon: Brain,
    color: 'from-cyan-500 to-blue-600',
    desc: 'Coding challenges, system design, debugging scenarios',
    examples: 'Algorithms, data structures, system architecture'
  },
  {
    id: 'behavioral',
    name: 'Behavioral Questions',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    desc: 'Past experiences, teamwork, problem-solving stories',
    examples: 'Leadership examples, conflict resolution, achievements'
  },
  {
    id: 'leadership',
    name: 'Leadership & Management',
    icon: Star,
    color: 'from-purple-500 to-pink-600',
    desc: 'Team management, strategic decisions, vision setting',
    examples: 'Team building, decision-making, strategic planning'
  },
  {
    id: 'presentation',
    name: 'Presentation Skills',
    icon: SkillTarget,
    color: 'from-orange-500 to-red-600',
    desc: 'Public speaking, stakeholder communication, storytelling',
    examples: 'Pitch presentations, technical demos, executive summaries'
  }
];

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState('');
  const [showSkills, setShowSkills] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowSkills(true);
  };

  const handleSkillSelect = (skill) => {
    if (selectedRole && skill) {
      localStorage.setItem('selectedRole', JSON.stringify(selectedRole));
      localStorage.setItem('selectedSkill', skill.id);
      navigate('/chat');
    }
  };

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('selectedRole', JSON.stringify(selectedRole));
      navigate(`/chat?role=${selectedRole.id}`);
    }
  };

  const handleBack = () => {
    setSelectedRole('');
    setShowSkills(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-4">
        <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-6xl w-full border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Select Your Role
            </h1>
            <p className="text-gray-400">Choose your target role for personalized interview questions</p>
          </div>

          {!showSkills ? (
            /* Role Selection Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <div
                    key={role.id}
                    className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer interactive ${
                      selectedRole?.id === role.id ? 'ring-2 ring-cyan-500 bg-cyan-500/10' : ''
                    }`}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-4`}>
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{role.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {role.skills.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                          +{role.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show only selected role details and Start button
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 p-8 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${selectedRole.color} rounded-xl flex items-center justify-center`}>
                    <selectedRole.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedRole.name}</h2>
                    <p className="text-gray-400">{selectedRole.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-sm text-cyan-300 rounded-full border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  Choose Different Role
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all"
                >
                  Start Interview Practice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 