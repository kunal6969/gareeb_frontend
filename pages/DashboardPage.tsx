import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as statsService from '../services/statsService';
import { Button } from '../components/UIElements';
import { HomeIcon, RocketIcon, UsersIcon } from '../components/VibrantIcons';
import LoadingIndicator from '../components/LoadingIndicator';
import { Link } from 'react-router-dom';

const InfoCard: React.FC<{title: string, children: React.ReactNode, className?: string, titleIcon?: React.ReactNode}> = ({ title, children, className, titleIcon }) => (
  <div className={`holo-card p-6 ${className}`}>
    <h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-cyan-500/20 pb-3 flex items-center gap-x-2">
      {titleIcon && <span className="w-7 h-7">{titleIcon}</span>}
      {title}
    </h3>
    {children}
  </div>
);

const AnimatedCounter: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return <>{count}</>;
};

const DashboardPage: React.FC = () => {
    const { loading } = useAuth();
    const [totalUsers, setTotalUsers] = useState(0);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsDataLoading(true);
        try {
            const stats = await statsService.getTotalUsers();
            setTotalUsers(stats.totalUsers);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setIsDataLoading(false);
        }
    }, []);
    
    useEffect(() => {
        document.body.classList.add('futuristic-theme');
        fetchData();
        return () => document.body.classList.remove('futuristic-theme');
    }, [fetchData]);

    if (loading || isDataLoading) return <LoadingIndicator message="Initializing Dashboard..." />;

    return (
        <div className="space-y-8">
            <div className="holo-card flex flex-col sm:flex-row justify-between items-start gap-4 p-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Welcome to MNIT LIVE! 
                    </h1>
                    <p className="futuristic-text-secondary mt-1">
                        Your ultimate CGPA tracker and academic helper for MNIT students.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                 <InfoCard title="MNIT Students" titleIcon={<UsersIcon />}>
                    <div className="text-center">
                        <p className="text-6xl font-black text-glow-white">
                            <AnimatedCounter end={totalUsers} />
                        </p>
                        <p className="futuristic-text-secondary mt-1">Students tracking their CGPA on MNIT LIVE.</p>
                    </div>
                 </InfoCard>

                <InfoCard title="CGPA Calculator" titleIcon={<HomeIcon />}>
                    <div className="text-center">
                        <p className="text-slate-300 mb-4">Calculate your CGPA and SGPA instantly with our advanced calculator.</p>
                        <Link to="/cgpa">
                            <Button variant="primary" size="lg" leftIcon={<RocketIcon />}>Start Calculating</Button>
                        </Link>
                    </div>
                </InfoCard>

                <InfoCard title="Academic Tools" titleIcon={<UsersIcon />}>
                    <div className="space-y-3">
                        <Link to="/cgpa">
                            <Button variant="secondary" className="w-full" leftIcon={<HomeIcon />}>CGPA Calculator</Button>
                        </Link>
                        <Link to="/attendance">
                            <Button variant="secondary" className="w-full" leftIcon={<UsersIcon />}>Attendance Tracker</Button>
                        </Link>
                        <Link to="/events">
                            <Button variant="secondary" className="w-full" leftIcon={<RocketIcon />}>Campus Events</Button>
                        </Link>
                    </div>
                </InfoCard>
            </div>
        </div>
    );
};

export default DashboardPage;
