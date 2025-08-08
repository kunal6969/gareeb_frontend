import { useState, useEffect, useMemo, FC } from 'react';
import { CgpaData, Subject } from '../types';
import * as cgpaService from '../services/cgpaService';
import { GRADE_OPTIONS } from '../constants';
import { Button, Input, Select } from '../components/UIElements';
import { TrashIcon, PlusIcon, ChartPieIcon } from '../components/VibrantIcons';
import LoadingIndicator from '../components/LoadingIndicator';

// --- Sub-components for the Futuristic UI ---
const SgpaCalculator: FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([{ id: `sub-${Date.now()}`, grade: '', credits: '', error: null }]);

    const handleSubjectChange = (id: string, field: 'grade' | 'credits', value: string) => {
        if (field === 'credits' && !/^\d*\.?\d*$/.test(value)) return;
        
        setSubjects(subjects.map(sub => {
            if (sub.id === id) {
                const newSub = { ...sub, [field]: value };
                // Basic validation
                const gradeVal = parseFloat(newSub.grade);
                const creditsVal = parseFloat(newSub.credits);
                if (newSub.grade && (isNaN(gradeVal) || gradeVal < 0 || gradeVal > 10)) {
                    newSub.error = 'grade';
                } else if (newSub.credits && (isNaN(creditsVal) || creditsVal < 0)) {
                    newSub.error = 'credits';
                } else {
                    newSub.error = null;
                }
                return newSub;
            }
            return sub;
        }));
    };

    const addSubject = () => setSubjects([...subjects, { id: `sub-${Date.now()}`, grade: '', credits: '', error: null }]);
    const removeSubject = (id: string) => setSubjects(subjects.filter(sub => sub.id !== id));
    
    const sgpaCalculation = useMemo(() => {
        let totalGradePoints = 0;
        let totalCredits = 0;
        let isCalculable = true;
        
        subjects.forEach(sub => {
            const grade = parseFloat(sub.grade);
            const credits = parseFloat(sub.credits);
            if (isNaN(grade) || isNaN(credits) || grade < 0 || grade > 10 || credits <= 0) {
                 if(sub.grade || sub.credits) isCalculable = false;
                 return;
            }
            totalGradePoints += grade * credits;
            totalCredits += credits;
        });

        const sgpa = totalCredits === 0 || !isCalculable ? '0.00' : (totalGradePoints / totalCredits).toFixed(2);
        
        return {
            sgpa,
            totalCredits,
            totalGradePoints,
            isCalculable
        };
    }, [subjects]);
    
    const { sgpa: calculatedSgpa, totalCredits, totalGradePoints } = sgpaCalculation;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="holo-card p-6 space-y-6 relative z-10">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2">Subject Grade Entry</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your subject grades and credits to calculate SGPA</p>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {subjects.map((sub, index) => (
                        <div key={sub.id} className="p-4 rounded-xl ring-1 ring-slate-200/80 dark:ring-white/10 bg-white dark:bg-[#0b1220]">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-1 ring-slate-200/80 dark:ring-white/10">
                                    <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">#{index + 1}</span>
                                </div>
                                <h4 className="text-slate-700 dark:text-slate-200 font-medium">Subject {index + 1}</h4>
                                {subjects.length > 1 && (
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => removeSubject(sub.id)} 
                                        className="!p-2 ml-auto"
                                        title="Remove Subject"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Select 
                                        label="Grade"
                                        value={sub.grade} 
                                        onChange={value => handleSubjectChange(sub.id, 'grade', value)}
                                        options={GRADE_OPTIONS}
                                        placeholder="Select your grade"
                                        className={''}
                                        error={sub.error === 'grade' ? 'Please select a valid grade' : undefined}
                                    />
                                </div>
                                
                                <div>
                                    <Input 
                                        type="text" 
                                        label="Credits"
                                        placeholder="e.g., 3, 4, 1.5" 
                                        value={sub.credits} 
                                        onChange={e => handleSubjectChange(sub.id, 'credits', e.target.value)} 
                                        className={`!mt-0 ${sub.error === 'credits' ? 'border-red-500' : ''}`}
                                        error={sub.error === 'credits' ? 'Enter valid credits (e.g., 3 or 1.5)' : undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="pt-4 border-t border-slate-200/70 dark:border-white/10">
                    <Button 
                        onClick={addSubject} 
                        leftIcon={<PlusIcon />} 
                        className="w-full"
                        size="lg"
                    >
                        Add Another Subject
                    </Button>
                </div>
            </div>
            
            <div className="holo-card p-8 text-center">
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Calculated SGPA</h3>
                    <div className="h-[2px] w-12 bg-slate-200 dark:bg-white/10 mx-auto rounded"></div>
                </div>
                
                <div className="mb-6">
                    <p className="text-7xl font-mono font-extrabold mb-2">
                        {calculatedSgpa}
                    </p>
                    <div className="text-slate-500 dark:text-slate-400 space-y-1">
                        <p className="text-sm">Total Credits: <span className="font-semibold text-slate-700 dark:text-slate-200">{totalCredits}</span></p>
                        <p className="text-sm">Grade Points: <span className="font-semibold text-slate-700 dark:text-slate-200">{totalGradePoints.toFixed(2)}</span></p>
                    </div>
                </div>
                
                <div className="space-y-2 text-sm">
                    {calculatedSgpa !== 'N/A' && (
                        <div className="p-3 rounded-lg ring-1 ring-slate-200/80 dark:ring-white/10">
                            <p className="font-medium text-slate-700 dark:text-slate-300">SGPA status updated.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CgpaCalculator: FC = () => {
    const [cgpaData, setCgpaData] = useState<CgpaData>({ semesters: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [prediction, setPrediction] = useState({ futureSgpa: '', futureCredits: '' });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await cgpaService.getCgpaData();
            if (data.semesters.length === 0) {
                 data.semesters.push({ id: `sem-${Date.now()}`, sgpa: '', credits: '' });
            }
            setCgpaData(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);
    
    const handleSemesterChange = (id: string, field: 'sgpa' | 'credits', value: string) => {
        if (!/^\d*\.?\d*$/.test(value)) return;
        const newSemesters = cgpaData.semesters.map(sem => sem.id === id ? { ...sem, [field]: value } : sem);
        const newData = { ...cgpaData, semesters: newSemesters };
        setCgpaData(newData);
        cgpaService.saveCgpaData(newData);
    };

    const addSemester = () => {
        const newSemesters = [...cgpaData.semesters, { id: `sem-${Date.now()}`, sgpa: '', credits: '' }];
        setCgpaData({ ...cgpaData, semesters: newSemesters });
    };
    
    const removeSemester = (id: string) => {
        if (cgpaData.semesters.length <= 1) return;
        const newSemesters = cgpaData.semesters.filter(sem => sem.id !== id);
        const newData = { ...cgpaData, semesters: newSemesters };
        setCgpaData(newData);
        cgpaService.saveCgpaData(newData);
    };

    const { currentCgpa, totalCredits, isCalculable } = useMemo(() => {
        let totalCreditPoints = 0;
        let totalCredits = 0;
        cgpaData.semesters.forEach(sem => {
            const sgpa = parseFloat(sem.sgpa);
            const credits = parseFloat(sem.credits);
            if (!isNaN(sgpa) && !isNaN(credits) && sgpa > 0 && sgpa <= 10 && credits > 0) {
                totalCreditPoints += sgpa * credits;
                totalCredits += credits;
            }
        });
        return {
            isCalculable: totalCredits > 0,
            currentCgpa: totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0,
            totalCredits,
        };
    }, [cgpaData]);

     const predictedCgpa = useMemo(() => {
        const futureSgpa = parseFloat(prediction.futureSgpa);
        const futureCredits = parseFloat(prediction.futureCredits);
        if (!isCalculable || isNaN(futureSgpa) || isNaN(futureCredits) || futureSgpa <= 0 || futureSgpa > 10 || futureCredits <= 0) return null;
        const newTotal = (currentCgpa * totalCredits + futureSgpa * futureCredits) / (totalCredits + futureCredits);
        return newTotal;
    }, [prediction, currentCgpa, totalCredits, isCalculable]);

    if (isLoading) return <div className="p-8"><LoadingIndicator message="Loading CGPA Data..." /></div>

    const isUserAuthenticated = !!localStorage.getItem('authToken');

    return (
        <div className="space-y-6">
            {!isUserAuthenticated && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                        <strong>Note:</strong> Your data is saved locally on this device. No sign-in required.
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="holo-card p-6 space-y-4">
                <h3 className="text-xl font-bold text-cyan-300">Enter Semester Details</h3>
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                    {cgpaData.semesters.map((sem, index) => (
                        <div key={sem.id} className="flex items-center gap-2 p-2 rounded-lg animate-slide-down-glow" style={{ animationDelay: `${index * 50}ms` }}>
                            <span className="font-mono text-cyan-400">Sem {index + 1}:</span>
                            <Input type="text" placeholder="SGPA" value={sem.sgpa} onChange={e => handleSemesterChange(sem.id, 'sgpa', e.target.value)} className="bg-slate-800 border-cyan-500/30 text-white !mt-0"/>
                            <Input type="text" placeholder="Credits" value={sem.credits} onChange={e => handleSemesterChange(sem.id, 'credits', e.target.value)} className="bg-slate-800 border-cyan-500/30 text-white !mt-0"/>
                            <Button variant="danger" size="sm" onClick={() => removeSemester(sem.id)} className="!p-2" disabled={cgpaData.semesters.length <= 1}>
                                <TrashIcon className="w-4 h-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
                <Button onClick={addSemester} leftIcon={<PlusIcon />} className="w-full">Add Semester</Button>
            </div>
            <div className="space-y-8">
                <div className="hologram-panel">
                    <div className={predictedCgpa !== null ? 'content-blur' : ''}>
                        <h3 className="text-xl font-bold text-cyan-300 opacity-80">Current CGPA</h3>
                        <p className="text-6xl font-mono font-black text-cyan-200 tracking-tighter" style={{ textShadow: '0 0 15px #00ffff99' }}>
                            {isCalculable ? currentCgpa.toFixed(3) : '0.000'}
                        </p>
                        <p className="text-sm text-cyan-400 opacity-70">Over {totalCredits} credits</p>
                    </div>

                    {predictedCgpa !== null && (
                         <div className="hologram-overlay">
                            <h2 className="text-lg font-bold text-fuchsia-300 opacity-80">Projected CGPA</h2>
                            <p className="text-5xl font-mono font-black text-fuchsia-200" style={{ textShadow: '0 0 15px #ff00ff99' }}>{predictedCgpa.toFixed(3)}</p>
                         </div>
                    )}
                </div>
                <div className="holo-card p-6">
                     <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2"> Predict Next Semester</h3>
                     <div className="flex items-center gap-2 mt-3">
                        <Input type="text" placeholder="Future SGPA" value={prediction.futureSgpa} onChange={e => setPrediction({...prediction, futureSgpa: e.target.value})} className="bg-slate-800 border-cyan-500/30 text-white !mt-0"/>
                        <Input type="text" placeholder="Future Credits" value={prediction.futureCredits} onChange={e => setPrediction({...prediction, futureCredits: e.target.value})} className="bg-slate-800 border-cyan-500/30 text-white !mt-0"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

const CgpaPage: FC = () => {
    const [mode, setMode] = useState<'cgpa' | 'sgpa'>('cgpa');

    useEffect(() => { /* no theme class; keep defaults */ }, []);

    return (
        <div className="relative min-h-[calc(100vh-250px)]">
             {/* Background grid removed for minimal look */}
             
             <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
                    <ChartPieIcon className="w-8 h-8" /> CGPA / SGPA Calculator
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Find your CGPA in real time</p>
             </div>
             
            <div className="flex justify-center mb-8 p-1 rounded-full bg-slate-100 dark:bg-white/5 ring-1 ring-slate-200/80 dark:ring-white/10 max-w-sm mx-auto">
                 <button
                     onClick={() => setMode('cgpa')}
                     className={`px-6 py-2 rounded-full text-sm font-semibold w-1/2 ${mode === 'cgpa' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-slate-100 ring-1 ring-slate-200/80 dark:ring-white/10' : 'text-slate-600 dark:text-slate-300'}`}
                 >
                     CGPA Calculator
                 </button>
                 <button
                     onClick={() => setMode('sgpa')}
                     className={`px-6 py-2 rounded-full text-sm font-semibold w-1/2 ${mode === 'sgpa' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-slate-100 ring-1 ring-slate-200/80 dark:ring-white/10' : 'text-slate-600 dark:text-slate-300'}`}
                 >
                     SGPA Calculator
                 </button>
             </div>
             
             <div>
               {mode === 'cgpa' ? <CgpaCalculator /> : <SgpaCalculator />}
             </div>
         </div>
     );
 }
 
export default CgpaPage;
