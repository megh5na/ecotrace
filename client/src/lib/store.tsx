import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Activity {
  id: string;
  type: string;
  source: string;
  category: 'transportation' | 'energy' | 'consumption';
  carbon: number;
  timestamp: Date;
  details: {
    distance?: string;
    amount?: string;
    transportMode?: string;
    energyType?: string;
    consumptionCategory?: string;
  };
  isAutoTracked: boolean;
}

interface Allocation {
  id: string;
  projectId: number;
  projectName: string;
  amount: number;
  timestamp: Date;
}

interface AppState {
  activities: Activity[];
  totalCarbon: number;
  carbonCredits: number;
  allocatedCredits: number;
  allocations: Allocation[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  allocateCredits: (projectId: number, projectName: string, amount: number) => boolean;
  redeemCredits: (vendorName: string, amount: number) => boolean;
  getTodayCarbon: () => number;
  getWeeklyAverage: () => number;
  getRecentActivities: (limit: number) => Activity[];
}

const AppContext = createContext<AppState | undefined>(undefined);

// Mock IoT activities that are always present
const generateMockIoTActivities = (): Activity[] => {
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return [
    {
      id: 'iot-1',
      type: 'Tesla Model 3',
      source: 'Vehicle IoT',
      category: 'transportation',
      carbon: 3.5,
      timestamp: twoHoursAgo,
      details: { distance: '15 km' },
      isAutoTracked: true,
    },
    {
      id: 'iot-2',
      type: 'Smart Home Hub',
      source: 'Home Automation',
      category: 'energy',
      carbon: 6.2,
      timestamp: fiveHoursAgo,
      details: { amount: '12 kWh' },
      isAutoTracked: true,
    },
    {
      id: 'iot-3',
      type: 'iPhone Location',
      source: 'Mobile Device',
      category: 'transportation',
      carbon: 0.4,
      timestamp: yesterday,
      details: { distance: '8 km' },
      isAutoTracked: true,
    },
  ];
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(() => {
    // Load from localStorage or use mock IoT data
    const saved = localStorage.getItem('ecotrace-activities');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      return parsed.map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp),
      }));
    }
    return generateMockIoTActivities();
  });

  const [carbonCredits, setCarbonCredits] = useState<number>(() => {
    const saved = localStorage.getItem('ecotrace-credits');
    return saved ? parseInt(saved) : 245;
  });

  const [allocatedCredits, setAllocatedCredits] = useState<number>(() => {
    const saved = localStorage.getItem('ecotrace-allocated');
    return saved ? parseInt(saved) : 0;
  });

  const [allocations, setAllocations] = useState<Allocation[]>(() => {
    const saved = localStorage.getItem('ecotrace-allocations');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp),
      }));
    }
    return [];
  });

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem('ecotrace-activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('ecotrace-credits', carbonCredits.toString());
  }, [carbonCredits]);

  useEffect(() => {
    localStorage.setItem('ecotrace-allocated', allocatedCredits.toString());
  }, [allocatedCredits]);

  useEffect(() => {
    localStorage.setItem('ecotrace-allocations', JSON.stringify(allocations));
  }, [allocations]);

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    setActivities((prev) => [newActivity, ...prev]);

    // Award credits for low-carbon activities (carbon reduction)
    // The LOWER the carbon, the MORE credits you earn
    // Examples:
    // - 0 kg CO₂ (bike/walk) = 10 credits
    // - 0.2 kg CO₂ (bus) = 8 credits  
    // - 0.5 kg CO₂ = 5 credits
    // - 1+ kg CO₂ (car) = 0 credits
    if (activity.carbon <= 1) {
      const creditsEarned = Math.floor((1 - activity.carbon) * 10);
      setCarbonCredits((prev) => prev + creditsEarned);
    }
  };

  const getTodayCarbon = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return activities
      .filter((a) => a.timestamp >= today)
      .reduce((sum, a) => sum + a.carbon, 0);
  };

  const getWeeklyAverage = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weekActivities = activities.filter((a) => a.timestamp >= weekAgo);
    const totalCarbon = weekActivities.reduce((sum, a) => sum + a.carbon, 0);

    return totalCarbon / 7;
  };

  const getRecentActivities = (limit: number) => {
    return activities.slice(0, limit);
  };

  const allocateCredits = (projectId: number, projectName: string, amount: number): boolean => {
    const availableCredits = carbonCredits - allocatedCredits;
    
    if (amount <= 0 || amount > availableCredits) {
      return false;
    }

    const newAllocation: Allocation = {
      id: `allocation-${Date.now()}`,
      projectId,
      projectName,
      amount,
      timestamp: new Date(),
    };

    setAllocations((prev) => [newAllocation, ...prev]);
    setAllocatedCredits((prev) => prev + amount);
    return true;
  };

  const redeemCredits = (vendorName: string, amount: number): boolean => {
    const availableCredits = carbonCredits - allocatedCredits;
    
    if (amount <= 0 || amount > availableCredits) {
      return false;
    }

    // Deduct credits permanently for redemption
    setCarbonCredits((prev) => prev - amount);
    return true;
  };

  const totalCarbon = activities.reduce((sum, a) => sum + a.carbon, 0);

  return (
    <AppContext.Provider
      value={{
        activities,
        totalCarbon,
        carbonCredits,
        allocatedCredits,
        allocations,
        addActivity,
        allocateCredits,
        redeemCredits,
        getTodayCarbon,
        getWeeklyAverage,
        getRecentActivities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
