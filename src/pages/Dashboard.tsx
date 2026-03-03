import { useEffect, useState } from 'react';
import { useWallet } from '../WalletProvider';
import { BountyBoard, type Task } from '../frontend-integration';
import contractInfo from '../contract.json';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { activeAddress } = useWallet();
  const bountyBoard = new BountyBoard(contractInfo);

  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [claimedTasks, setClaimedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'claimed'>('created');

  useEffect(() => {
    if (activeAddress) {
      loadDashboard();
    }
  }, [activeAddress]);

  const loadDashboard = async () => {
    if (!activeAddress) return;

    try {
      setLoading(true);
      const [created, claimed] = await Promise.all([
        bountyBoard.getTasksByClient(activeAddress),
        bountyBoard.getTasksByFreelancer(activeAddress)
      ]);
      setMyTasks(created);
      setClaimedTasks(claimed);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (!activeAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }}>
        <div className="card max-w-md text-center py-12">
          <svg className="mx-auto h-12 w-12" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-[#d4af37]">Wallet Required</h3>
          <p className="mt-2 text-[#b0b0b8]">
            Please connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  const displayTasks = activeTab === 'created' ? myTasks : claimedTasks;

  return (
    <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#d4af37] mb-3">My Dashboard</h1>
          <p className="text-[#b0b0b8] text-lg">
            Manage your tasks and track your activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#b0b0b8]">Tasks Created</p>
                <p className="text-3xl font-bold text-[#d4af37] mt-2">{myTasks.length}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#b0b0b8]">Tasks Claimed</p>
                <p className="text-3xl font-bold text-[#bb86fc] mt-2">{claimedTasks.length}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'rgba(187, 134, 252, 0.1)', color: '#bb86fc' }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#b0b0b8]">Total Value</p>
                <p className="text-3xl font-bold text-[#00d4ff] mt-2">
                  {(myTasks.reduce((sum, task) => sum + Number(BountyBoard.microToAlgo(task.amount)), 0) +
                    claimedTasks.reduce((sum, task) => sum + Number(BountyBoard.microToAlgo(task.amount)), 0)).toFixed(2)}
                  <span className="text-base ml-1">ALGO</span>
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff' }}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'created'
                ? 'text-[#0f0f1e]'
                : 'text-[#b0b0b8] hover:text-[#d4af37]'
            }`}
            style={{
              background: activeTab === 'created' ? 'linear-gradient(135deg, #d4af37 0%, #f4c95d 100%)' : 'transparent',
              border: activeTab === 'created' ? 'none' : '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: activeTab === 'created' ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none',
            }}
          >
            Tasks I Created ({myTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('claimed')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'claimed'
                ? 'text-[#0f0f1e]'
                : 'text-[#b0b0b8] hover:text-[#bb86fc]'
            }`}
            style={{
              background: activeTab === 'claimed' ? 'linear-gradient(135deg, #bb86fc 0%, #d4af37 100%)' : 'transparent',
              border: activeTab === 'claimed' ? 'none' : '1px solid rgba(187, 134, 252, 0.3)',
              boxShadow: activeTab === 'claimed' ? '0 4px 15px rgba(187, 134, 252, 0.3)' : 'none',
            }}
          >
            Tasks I Claimed ({claimedTasks.length})
          </button>
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#d4af37' }}></div>
          </div>
        ) : displayTasks.length === 0 ? (
          <div className="card text-center py-20">
            <svg className="mx-auto h-12 w-12" style={{ color: '#b0b0b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#d4af37]">No tasks yet</h3>
            <p className="mt-2 text-[#b0b0b8]">
              {activeTab === 'created'
                ? 'Create your first task to get started'
                : 'Browse available tasks to claim one'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTasks.map((task) => (
              <TaskCard key={task.taskId} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
