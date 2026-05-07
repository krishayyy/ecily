export type USState =
  | 'Alabama' | 'Alaska' | 'Arizona' | 'Arkansas' | 'California'
  | 'Colorado' | 'Connecticut' | 'Delaware' | 'Florida' | 'Georgia'
  | 'Hawaii' | 'Idaho' | 'Illinois' | 'Indiana' | 'Iowa'
  | 'Kansas' | 'Kentucky' | 'Louisiana' | 'Maine' | 'Maryland'
  | 'Massachusetts' | 'Michigan' | 'Minnesota' | 'Mississippi' | 'Missouri'
  | 'Montana' | 'Nebraska' | 'Nevada' | 'New Hampshire' | 'New Jersey'
  | 'New Mexico' | 'New York' | 'North Carolina' | 'North Dakota' | 'Ohia'
  | 'Oklahoma' | 'Oregon' | 'Pennsylvania' | 'Rhode Island' | 'South Carolina'
  | 'South Dakota' | 'Tennessee' | 'Texas' | 'Utah' | 'Vermont'
  | 'Virginia' | 'Washington' | 'West Virginia' | 'Wisconsin' | 'Wyoming';

export type MoneySituation = 'noIncomeYet' | 'allowanceGifts' | 'partTimeJob' | 'fullTimeJob';

export type FinancialGoal =
  | 'Build savings'
  | 'Start investing'
  | 'Master budgeting'
  | 'Build credit'
  | 'Pay for college'
  | 'Own a home'
  | 'Buy a car'
  | 'Kill debt';

export type ExplanationStyle = 'Simple' | 'Normal' | 'Deep';

export interface User {
  uid: string;
  name: string;
  email: string;
  age: number;
  state: USState;
  moneySituation: MoneySituation;
  goals: FinancialGoal[];
  explanationStyle: ExplanationStyle;
  xp: number;
  level: number;
  streak: number;
  ecilyCoins: number;
  isOnboardingComplete: boolean;
  completedLessons: string[];
  portfolio: {
    balance: number;
    holdings: Holding[];
  };
}

export interface Holding {
  symbol: string;
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  xpReward: number;
  coinReward: number;
  content: string;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface World {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}
