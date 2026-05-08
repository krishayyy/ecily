import { type World } from './types';
import { PiggyBank, TrendingUp, Landmark, CreditCard } from 'lucide-react';

export const CURRICULUM: World[] = [
  {
    id: 'budget_city',
    name: 'Budget City',
    subtitle: 'Master your money flow',
    icon: PiggyBank,
    lessons: [
      {
        id: 'bc_01',
        title: 'Capital Theory',
        subtitle: 'The basics school never taught',
        xpReward: 100,
        coinReward: 25,
        content: "Money is a medium of exchange. It replaces the primitive barter system, allowing for the precise quantification and transfer of value across time and space.",
        quiz: [
          {
            id: 'q1',
            question: "What is the primary function of currency?",
            options: ["Aesthetic Display", "Medium of Exchange", "Physical Security", "Resource Extraction"],
            correctIndex: 1,
            explanation: "Currency enables fluid trade without requiring direct commodity swaps."
          }
        ]
      },
      {
        id: 'bc_02',
        title: 'Priority Matrix',
        subtitle: 'Needs vs Wants',
        xpReward: 100,
        coinReward: 25,
        content: "Operational success requires distinguishing between core survival needs and discretionary wants. Allocating resources to needs first ensures long-term survival.",
        quiz: [
          {
            id: 'q2',
            question: "Which of these is a CORE NEED?",
            options: ["Entertainment Subscription", "Premium Footwear", "Nutritional Supply", "Gaming Hardware"],
            correctIndex: 2,
            explanation: "Sustenance is a baseline requirement for continued operations."
          }
        ]
      }
    ]
  },
  {
    id: 'wall_street',
    name: 'Wall Street',
    subtitle: 'Build real wealth',
    icon: TrendingUp,
    lessons: [
      {
        id: 'ws_01',
        title: 'Equity Ownership',
        subtitle: 'What is a Stock?',
        xpReward: 120,
        coinReward: 30,
        content: "A stock represents fractional ownership of a corporation. By holding equity, you gain rights to the company's assets and future earnings trajectory.",
        quiz: [
          {
             id: 'q3',
             question: "Holding a stock grants you what?",
             options: ["Employment Contract", "Fractional Ownership", "Direct Management Control", "Tax Exemption"],
             correctIndex: 1,
             explanation: "Stocks turn you from a consumer into a partial owner of the business."
          }
        ]
      }
    ]
  },
  {
    id: 'tax_town',
    name: 'Tax Town',
    subtitle: 'Navigating State Jurisdictions',
    icon: Landmark,
    lessons: [
      {
        id: 'tt_01',
        title: 'Revenue Extraction',
        subtitle: 'The Tax Code',
        xpReward: 150,
        coinReward: 40,
        content: "Taxes are mandatory contributions to state and federal governments. Understanding the brackets ensures you retain maximum net capital from your gross earnings.",
        quiz: [
            {
               id: 'q4',
               question: "Which document defines your withholding?",
               options: ["W-4", "Resume", "Bank Statement", "Identity Card"],
               correctIndex: 0,
               explanation: "The W-4 protocol tells your employer how much capital to transfer to the IRS."
            }
        ]
      }
    ]
  },
  {
    id: 'credit_city',
    name: 'Credit City',
    subtitle: 'The Velocity of Reputation',
    icon: CreditCard,
    lessons: [
      {
        id: 'cc_01',
        title: 'Trust Index',
        subtitle: 'Your FICO Score',
        xpReward: 200,
        coinReward: 50,
        content: "Credit is the measure of trust between a lender and a borrower. A high score grants access to low-interest leverage, accelerating your asset acquisition.",
        quiz: [
            {
               id: 'q5',
               question: "What is the primary factor in your score?",
               options: ["Account Balance", "Payment History", "Employment Duration", "Social Influence"],
               correctIndex: 1,
               explanation: "Reliable repayment is the strongest indicator of future performance."
            }
        ]
      }
    ]
  }
];
