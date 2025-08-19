"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  MessageCircle,
  Plus,
  Edit3
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'legal' | 'financial' | 'custom';
  isExpanded: boolean;
  isCustom?: boolean;
  agentId?: string;
}

// Helper functions
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'general': return '🏠';
    case 'legal': return '⚖️';
    case 'financial': return '💰';
    case 'custom': return '💬';
    default: return '❓';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'general': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    case 'legal': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-blue-200';
    case 'financial': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-blue-200';
    case 'custom': return 'bg-orange-100 text-orange-800 dark:bg-blue-900/30 dark:text-blue-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-blue-200';
  }
};

export function PropertyFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    // Pre-filled general FAQs
    {
      id: '1',
      question: 'Is this property freehold or leasehold?',
      answer: 'This property is freehold, which means you will own the land and property indefinitely without any time restrictions.',
      category: 'general',
      isExpanded: false
    },
    {
      id: '2',
      question: 'Can foreigners buy this property?',
      answer: 'Yes, foreigners can purchase this property. However, there are certain restrictions and requirements that need to be met, including minimum purchase price thresholds and approval from relevant authorities.',
      category: 'general',
      isExpanded: false
    },
    {
      id: '3',
      question: 'What is the maintenance fee and service charge?',
      answer: 'The maintenance fee is RM 0.35 per sqft per month, and the service charge is RM 0.25 per sqft per month. These fees cover common area maintenance, security, and building management services.',
      category: 'financial',
      isExpanded: false
    },
    {
      id: '4',
      question: 'Is the property furnished?',
      answer: 'This property comes unfurnished, giving you the flexibility to furnish it according to your preferences and needs.',
      category: 'general',
      isExpanded: false
    },
    {
      id: '5',
      question: 'What are the parking arrangements?',
      answer: 'The property includes 2 covered parking spaces. Additional parking spaces can be rented at RM 150 per month if available.',
      category: 'general',
      isExpanded: false
    },
    {
      id: '6',
      question: 'Are there any restrictions on renovations?',
      answer: 'Minor renovations are allowed with prior approval from the management. Major structural changes require written permission and may need approval from local authorities.',
      category: 'legal',
      isExpanded: false
    },
    {
      id: '7',
      question: 'What is the property tax assessment?',
      answer: 'The annual property tax assessment is approximately RM 2,400. This amount may vary based on the current market value assessment by the local authority.',
      category: 'financial',
      isExpanded: false
    },
    {
      id: '8',
      question: 'Is there a sinking fund?',
      answer: 'Yes, there is a sinking fund contribution of RM 0.15 per sqft per month. This fund is used for major repairs and renovations of common areas.',
      category: 'financial',
      isExpanded: false
    },
    // Agent-added custom FAQs
    {
      id: '9',
      question: 'What makes this property unique in the area?',
      answer: 'This property stands out due to its premium location with direct access to major highways, its modern design with high-quality finishes, and the exclusive amenities including a rooftop garden and fitness center that are rare in this neighborhood.',
      category: 'custom',
      isExpanded: false,
      isCustom: true,
      agentId: 'agent123'
    },
    {
      id: '10',
      question: 'What is the expected rental yield for this property?',
      answer: 'Based on current market conditions and comparable properties in the area, this property is expected to generate a rental yield of approximately 4.5-5.2% annually, making it an attractive investment option.',
      category: 'custom',
      isExpanded: false,
      isCustom: true,
      agentId: 'agent123'
    }
  ]);

  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: 'general' as 'general' | 'legal' | 'financial' | 'custom' });

  const toggleFAQ = (id: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
    ));
  };

  const addCustomFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const customFAQ: FAQ = {
        id: Date.now().toString(),
        question: newFAQ.question,
        answer: newFAQ.answer,
        category: newFAQ.category,
        isExpanded: false,
        isCustom: true,
        agentId: 'agent123' // Mock agent ID
      };
      
      setFaqs([...faqs, customFAQ]);
      setNewFAQ({ question: '', answer: '', category: 'general' });
      setShowAddFAQ(false);
    }
  };



  const groupedFAQs = {
    general: faqs.filter(faq => faq.category === 'general'),
    legal: faqs.filter(faq => faq.category === 'legal'),
    financial: faqs.filter(faq => faq.category === 'financial'),
    custom: faqs.filter(faq => faq.category === 'custom')
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get answers to common questions about this property
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowAddFAQ(!showAddFAQ)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Custom FAQ
          </Button>
        </div>

        {/* Add Custom FAQ Form */}
        {showAddFAQ && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Add Custom FAQ
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  placeholder="Enter your question..."
                  className="w-full px-3 py-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Answer
                </label>
                <textarea
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  placeholder="Enter the answer..."
                  rows={3}
                  className="w-full px-3 py-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Category
                </label>
                <select
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value as 'general' | 'legal' | 'financial' | 'custom' })}
                  className="w-full px-3 py-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="general">General</option>
                  <option value="legal">Legal</option>
                  <option value="financial">Financial</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={addCustomFAQ} size="sm">
                  Add FAQ
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAddFAQ(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Categories */}
        <div className="space-y-6">
          {/* General FAQs */}
          {groupedFAQs.general.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>🏠</span>
                General Information
              </h3>
              <div className="space-y-2">
                {groupedFAQs.general.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} onToggle={toggleFAQ} />
                ))}
              </div>
            </div>
          )}

          {/* Legal FAQs */}
          {groupedFAQs.legal.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>⚖️</span>
                Legal & Regulations
              </h3>
              <div className="space-y-2">
                {groupedFAQs.legal.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} onToggle={toggleFAQ} />
                ))}
              </div>
            </div>
          )}

          {/* Financial FAQs */}
          {groupedFAQs.financial.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>💰</span>
                Financial & Costs
              </h3>
              <div className="space-y-2">
                {groupedFAQs.financial.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} onToggle={toggleFAQ} />
                ))}
              </div>
            </div>
          )}

          {/* Custom FAQs */}
          {groupedFAQs.custom.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>💬</span>
                Agent Insights
                <Badge variant="secondary" className="ml-2">
                  Custom
                </Badge>
              </h3>
              <div className="space-y-2">
                {groupedFAQs.custom.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} onToggle={toggleFAQ} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Agent */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                Still have questions?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Our property experts are here to help. Get in touch for personalized assistance.
              </p>
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface FAQItemProps {
  faq: FAQ;
  onToggle: (id: string) => void;
}

function FAQItem({ faq, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        onClick={() => onToggle(faq.id)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-start gap-3">
          <Badge variant="outline" className={getCategoryColor(faq.category)}>
            {getCategoryIcon(faq.category)}
          </Badge>
          <span className="font-medium text-gray-900 dark:text-white">
            {faq.question}
          </span>
        </div>
        {faq.isCustom && (
          <Badge variant="secondary" className="ml-2 text-xs">
            Custom
          </Badge>
        )}
        {faq.isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {faq.isExpanded && (
        <div className="px-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="pt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
            {faq.answer}
          </div>
          {faq.isCustom && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <Edit3 className="h-3 w-3" />
              <span>Added by agent</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 