import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../styles/themes/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faChartPie, faMoneyBillWave, faChartArea,
  faBrain, faFilePdf, faCloudDownloadAlt, faCog, faLightbulb,
  faHistory, faSyncAlt, faClock, faChartBar, faDollarSign,
  faPiggyBank, faProjectDiagram, faRocket, faBalanceScale,
  faCalculator, faSave, faInfoCircle, faChevronDown, faChevronUp,
  faStore, faIndustry, faBriefcase, faCoffee
} from '@fortawesome/free-solid-svg-icons';
import CalculatorSidebar from './CalculatorSidebar';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';

// Main EnhancedDashboard component that manages navigation and renders appropriate content
const EnhancedDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { theme } = useContext(ThemeContext) || { theme: {} };
  
  // Shared financial parameters
  const [businessType, setBusinessType] = useState('cafe');
  const [investment, setInvestment] = useState(100000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(30000);
  const [operatingCosts, setOperatingCosts] = useState(18000);
  const [growthRate, setGrowthRate] = useState(5);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [taxRate, setTaxRate] = useState(25);
  const [discountRate, setDiscountRate] = useState(8);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [roi, setRoi] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioName, setCurrentScenarioName] = useState('Base Scenario');

  // Advanced parameters
  const [advancedParams, setAdvancedParams] = useState({
    // Cafe specific parameters
    seatingCapacity: 30,
    avgTicket: 12.5,
    turnoverRate: 4,
    staffCount: 4,
    avgStaffWage: 15,
    foodCost: 28,
    beverageCost: 22,
    rent: 3500,
    
    // Retail specific parameters
    squareFootage: 1200,
    salesPerSqFt: 350,
    inventoryTurnover: 6,
    shrinkage: 2,
    staffingCost: 18,
    
    // Manufacturing specific parameters
    productionCapacity: 5000,
    materialCostPercent: 45,
    laborCostPercent: 25,
    overheadPercent: 15,
    defectRate: 2,
    
    // Service business parameters
    billableHours: 160,
    hourlyRate: 125,
    utilizationRate: 75,
    overheadPerEmployee: 2500,
    employeeCount: 8,
    
    // Common parameters
    marketingPercent: 5
  });

  // Revenue breakdown
  const [revenueStreams, setRevenueStreams] = useState([
    { name: 'Product Sales', percentage: 75, growth: 8 },
    { name: 'Services', percentage: 25, growth: 12 }
  ]);
  
  // Expense breakdown
  const [expenseCategories, setExpenseCategories] = useState([
    { name: 'Labor', percentage: 35, reducible: 10 },
    { name: 'Rent', percentage: 20, reducible: 5 },
    { name: 'Materials', percentage: 25, reducible: 15 },
    { name: 'Marketing', percentage: 10, reducible: 20 },
    { name: 'Utilities', percentage: 5, reducible: 8 },
    { name: 'Other', percentage: 5, reducible: 12 }
  ]);
  
  // Calculations
  const [results, setResults] = useState(null);
  const [aiInsights, setAiInsights] = useState(null);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  
  // Business types
  const businessTypes = [
    { id: 'cafe', name: 'Café / Restaurant', icon: faCoffee },
    { id: 'retail', name: 'Retail Business', icon: faStore },
    { id: 'service', name: 'Service Business', icon: faBriefcase },
    { id: 'manufacturing', name: 'Manufacturing', icon: faIndustry },
  ];
  
  // Calculate results when inputs change
  useEffect(() => {
    calculateResults();
  }, [investment, monthlyRevenue, operatingCosts, businessType, advancedParams, growthRate, inflationRate, taxRate, discountRate]);
  
  // Calculate financial metrics
  const calculateResults = () => {
    const monthlyProfit = monthlyRevenue - operatingCosts;
    const annualProfit = monthlyProfit * 12;
    const calculatedRoi = (annualProfit / investment) * 100;
    const calculatedPaybackPeriod = investment / monthlyProfit;
    
    // Business-specific calculations
    let riskFactor = 1.0;
    let businessGrowthRate = growthRate;
    
    switch (businessType) {
      case 'cafe':
        riskFactor = 1.2;
        businessGrowthRate = growthRate + (advancedParams.seatingCapacity / 50);
        break;
      case 'retail':
        riskFactor = 1.1;
        businessGrowthRate = growthRate + (advancedParams.inventoryTurnover / 10);
        break;
      case 'service':
        riskFactor = 0.9;
        businessGrowthRate = growthRate + (advancedParams.utilizationRate / 20);
        break;
      case 'manufacturing':
        riskFactor = 1.3;
        businessGrowthRate = growthRate + (100 - advancedParams.defectRate) / 20;
        break;
      default:
        break;
    }
    
    // Adjusted calculations
    const adjustedRoi = calculatedRoi / riskFactor;
    const effectiveTaxRate = taxRate / 100;
    const afterTaxAnnualProfit = annualProfit * (1 - effectiveTaxRate);
    const npv = calculateNPV(afterTaxAnnualProfit, investment, discountRate / 100, 5);
    const irr = calculateIRR(afterTaxAnnualProfit, investment, 5);
    
    // 5-year projections with advanced parameters
    const fiveYearProjection = [];
    let yearlyRevenue = monthlyRevenue * 12;
    let yearlyCosts = operatingCosts * 12;
    
    for (let year = 1; year <= 5; year++) {
      // Apply growth rate with diminishing returns
      const effectiveGrowthRate = businessGrowthRate * Math.pow(0.9, year - 1);
      
      yearlyRevenue *= (1 + effectiveGrowthRate / 100);
      yearlyCosts *= (1 + inflationRate / 100);
      
      // Apply seasonality for quarterly breakdowns
      const quarterlyRevenue = [];
      const quarterlyCosts = [];
      
      for (let quarter = 1; quarter <= 4; quarter++) {
        // Seasonal factors
        let seasonalFactor = 1;
        if (quarter === 1) seasonalFactor = 0.9;
        if (quarter === 2) seasonalFactor = 1.1;
        if (quarter === 3) seasonalFactor = 0.9;
        if (quarter === 4) seasonalFactor = 1.2;
        
        quarterlyRevenue.push({
          quarter: `Q${quarter}`,
          revenue: (yearlyRevenue / 4) * seasonalFactor
        });
        
        quarterlyCosts.push({
          quarter: `Q${quarter}`,
          costs: (yearlyCosts / 4) * (1 + (seasonalFactor - 1) * 0.5)
        });
      }
      
      fiveYearProjection.push({
        year,
        revenue: yearlyRevenue,
        costs: yearlyCosts,
        profit: yearlyRevenue - yearlyCosts,
        quarterlyRevenue,
        quarterlyCosts
      });
    }
    
    // Monthly breakdown for first year
    const monthlyBreakdown = [];
    for (let month = 1; month <= 12; month++) {
      // Seasonal monthly factors
      let monthlyFactor = 1;
      // Spring
      if (month >= 3 && month <= 5) monthlyFactor = 1.1;
      // Summer
      if (month >= 6 && month <= 8) monthlyFactor = 1.2;
      // Fall
      if (month >= 9 && month <= 11) monthlyFactor = 1.05;
      // Winter
      if (month === 12) monthlyFactor = 1.3;
      if (month === 1 || month === 2) monthlyFactor = 0.85;
      
      monthlyBreakdown.push({
        month: getMonthName(month),
        revenue: (monthlyRevenue * monthlyFactor),
        costs: (operatingCosts * (1 + (monthlyFactor - 1) * 0.3)),
        profit: (monthlyRevenue * monthlyFactor) - (operatingCosts * (1 + (monthlyFactor - 1) * 0.3))
      });
    }
    
    // Break-even analysis
    const breakEvenAnalysis = calculateBreakEvenPoint(investment, monthlyRevenue, operatingCosts);
    
    // Revenue streams
    const revenueStreamData = revenueStreams.map(stream => ({
      name: stream.name,
      value: (stream.percentage / 100) * monthlyRevenue,
      growth: stream.growth
    }));
    
    // Expense categories
    const expenseCategoryData = expenseCategories.map(category => ({
      name: category.name,
      value: (category.percentage / 100) * operatingCosts,
      reducible: (category.reducible / 100) * (category.percentage / 100) * operatingCosts
    }));
    
    // Set calculated metrics
    setRoi(calculatedRoi);
    setPaybackPeriod(calculatedPaybackPeriod);
    
    // Set complete results
    setResults({
      monthlyProfit,
      annualProfit,
      roi: calculatedRoi,
      adjustedRoi,
      paybackPeriod: calculatedPaybackPeriod,
      fiveYearProjection,
      monthlyBreakdown,
      breakEvenAnalysis,
      revenueStreamData,
      expenseCategoryData,
      npv,
      irr,
      afterTaxAnnualProfit,
      riskFactor
    });
  };
  
  // NPV calculation
  const calculateNPV = (annualCashFlow, initialInvestment, discountRate, years) => {
    let npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + discountRate, year);
    }
    return npv;
  };
  
  // Simple IRR approximation
  const calculateIRR = (annualCashFlow, initialInvestment, years) => {
    const totalReturn = (annualCashFlow * years) - initialInvestment;
    const averageReturn = totalReturn / years;
    return (averageReturn / initialInvestment) * 100;
  };
  
  // Calculate break-even point with monthly resolution
  const calculateBreakEvenPoint = (investment, monthlyRevenue, monthlyCost) => {
    const monthlyProfit = monthlyRevenue - monthlyCost;
    if (monthlyProfit <= 0) return { months: Infinity, amount: 0 };
    
    const months = Math.ceil(investment / monthlyProfit);
    
    const breakEvenData = [];
    let cumulativeProfit = -investment;
    
    for (let month = 1; month <= Math.min(months + 3, 36); month++) {
      cumulativeProfit += monthlyProfit;
      
      breakEvenData.push({
        month,
        cumulativeProfit
      });
    }
    
    return {
      months,
      amount: monthlyProfit * months,
      data: breakEvenData
    };
  };
  
  // Get month name
  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthNumber - 1];
  };
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Update advanced parameter
  const handleAdvancedParamChange = (param, value) => {
    setAdvancedParams(prev => ({
      ...prev,
      [param]: value
    }));
  };
  
  // Save current scenario
  const saveScenario = () => {
    const newScenario = {
      id: Date.now(),
      name: currentScenarioName,
      businessType,
      investment,
      monthlyRevenue,
      operatingCosts,
      growthRate,
      inflationRate,
      taxRate,
      discountRate,
      advancedParams: { ...advancedParams },
      revenueStreams: [...revenueStreams],
      expenseCategories: [...expenseCategories],
      results: { ...results }
    };
    
    setScenarios([...scenarios, newScenario]);
    alert(`Scenario "${currentScenarioName}" saved successfully!`);
  };
  
  // Load a saved scenario
  const loadScenario = (scenario) => {
    setBusinessType(scenario.businessType);
    setInvestment(scenario.investment);
    setMonthlyRevenue(scenario.monthlyRevenue);
    setOperatingCosts(scenario.operatingCosts);
    setGrowthRate(scenario.growthRate);
    setInflationRate(scenario.inflationRate);
    setTaxRate(scenario.taxRate);
    setDiscountRate(scenario.discountRate);
    setAdvancedParams(scenario.advancedParams);
    setRevenueStreams(scenario.revenueStreams);
    setExpenseCategories(scenario.expenseCategories);
    setCurrentScenarioName(scenario.name);
    
    alert(`Scenario "${scenario.name}" loaded successfully!`);
  };
  
  // Generate AI insights
  const generateAIInsights = () => {
    setIsGeneratingInsights(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const insights = {
        summary: generateSummaryInsight(),
        opportunities: generateOpportunities(),
        risks: generateRisks(),
        recommendations: generateRecommendations()
      };
      
      setAiInsights(insights);
      setIsGeneratingInsights(false);
    }, 2000);
  };
  
  // Generate summary insights based on business type and results
  const generateSummaryInsight = () => {
    if (!results) return "";
    
    const profitMargin = (results.monthlyProfit / monthlyRevenue) * 100;
    
    let summary = "";
    let profitAssessment = "";
    let paybackAssessment = "";
    
    if (profitMargin > 25) {
      profitAssessment = "excellent profit margin";
    } else if (profitMargin > 15) {
      profitAssessment = "good profit margin";
    } else if (profitMargin > 8) {
      profitAssessment = "acceptable profit margin";
    } else {
      profitAssessment = "concerning profit margin";
    }
    
    if (results.paybackPeriod < 12) {
      paybackAssessment = "rapid return on investment";
    } else if (results.paybackPeriod < 24) {
      paybackAssessment = "reasonable payback period";
    } else if (results.paybackPeriod < 36) {
      paybackAssessment = "moderate payback timeline";
    } else {
      paybackAssessment = "extended payback duration";
    }
    
    // Generate business-specific insights
    switch (businessType) {
      case 'cafe':
        summary = `Your café concept shows a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${results.paybackPeriod.toFixed(1)} months. `;
        
        if (advancedParams.seatingCapacity < 20) {
          summary += "The limited seating capacity suggests focusing on higher margin items and quick turnover. ";
        } else {
          summary += "Your seating capacity allows for steady customer flow and potential for private events. ";
        }
        
        if (advancedParams.foodCost + advancedParams.beverageCost > 60) {
          summary += "Consider optimizing your menu to reduce cost of goods sold while maintaining quality.";
        } else {
          summary += "Your cost structure appears well-optimized for profitability.";
        }
        break;
        
      case 'retail':
        summary = `Your retail business model demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${results.paybackPeriod.toFixed(1)} months. `;
        
        if (advancedParams.inventoryTurnover < 4) {
          summary += "Focus on improving inventory turnover to reduce carrying costs and increase cash flow. ";
        } else {
          summary += "Your inventory management appears efficient with healthy turnover rates. ";
        }
        
        if (advancedParams.shrinkage > 3) {
          summary += "Implementing loss prevention measures could significantly improve bottom-line performance.";
        } else {
          summary += "Your operational controls appear to be effective at minimizing shrinkage.";
        }
        break;
        
      case 'service':
        summary = `Your service business demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${results.paybackPeriod.toFixed(1)} months. `;
        
        if (advancedParams.utilizationRate < 70) {
          summary += "Increasing consultant utilization should be a priority to maximize revenue potential. ";
        } else {
          summary += "Your team utilization is strong, supporting healthy revenue generation. ";
        }
        
        if (advancedParams.hourlyRate < 100) {
          summary += "Consider evaluating your pricing strategy as your rates appear below market potential.";
        } else {
          summary += "Your pricing structure appears well-positioned for your market segment.";
        }
        break;
        
      case 'manufacturing':
        summary = `Your manufacturing operation shows a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${results.paybackPeriod.toFixed(1)} months. `;
        
        if (advancedParams.defectRate > 3) {
          summary += "Implementing quality control improvements could significantly enhance profitability. ";
        } else {
          summary += "Your quality control appears effective with low defect rates. ";
        }
        
        if (advancedParams.materialCostPercent + advancedParams.laborCostPercent > 75) {
          summary += "Exploring supply chain optimization could yield meaningful cost reductions.";
        } else {
          summary += "Your production cost structure appears well-managed for your industry.";
        }
        break;
        
      default:
        summary = `Your business demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${results.paybackPeriod.toFixed(1)} months.`;
    }
    
    return summary;
  };
  
  // Generate opportunities based on business type and results
  const generateOpportunities = () => {
    if (!results) return [];
    
    const opportunities = [];
    
    switch (businessType) {
      case 'cafe':
        if (advancedParams.avgTicket < 15) {
          opportunities.push("Increase average ticket size through strategic menu engineering and upselling");
        }
        if (advancedParams.turnoverRate < 3.5) {
          opportunities.push("Optimize table turnover through service process improvements and floor plan adjustments");
        }
        if (advancedParams.foodCost + advancedParams.beverageCost > 55) {
          opportunities.push("Renegotiate supplier contracts and refine menu to improve profit margins");
        }
        opportunities.push("Develop catering services as additional revenue stream with higher margins");
        break;
        
      case 'retail':
        if (advancedParams.salesPerSqFt < 300) {
          opportunities.push("Optimize store layout and product placement to increase sales per square foot");
        }
        if (advancedParams.inventoryTurnover < 5) {
          opportunities.push("Implement data-driven inventory management to improve turnover and reduce carrying costs");
        }
        opportunities.push("Develop an omnichannel strategy to complement physical sales with e-commerce");
        opportunities.push("Introduce private label products to improve margin mix");
        break;
        
      case 'service':
        if (advancedParams.utilizationRate < 75) {
          opportunities.push("Improve resource allocation and scheduling to increase billable hours");
        }
        if (advancedParams.hourlyRate < 150) {
          opportunities.push("Implement value-based pricing for premium services");
        }
        opportunities.push("Develop recurring revenue streams through service contracts or subscriptions");
        opportunities.push("Create productized service offerings for scalable growth");
        break;
        
      case 'manufacturing':
        if (advancedParams.defectRate > 2) {
          opportunities.push("Implement lean manufacturing principles to reduce defect rates and waste");
        }
        if (advancedParams.materialCostPercent > 40) {
          opportunities.push("Optimize supply chain and explore alternative materials to reduce costs");
        }
        opportunities.push("Develop value-added services to complement product offerings");
        opportunities.push("Invest in automation for high-volume processes to improve efficiency");
        break;
        
      default:
        opportunities.push("Explore additional revenue streams complementary to your core business");
        opportunities.push("Invest in technology to improve operational efficiency");
        opportunities.push("Develop a customer retention strategy to increase lifetime value");
    }
    
    return opportunities;
  };
  
  // Generate risks based on business type and results
  const generateRisks = () => {
    if (!results) return [];
    
    const risks = [];
    
    // Common risks based on financial metrics
    if (results.paybackPeriod > 30) {
      risks.push({
        factor: "Extended Payback",
        impact: "Medium",
        description: "Long payback period increases exposure to market changes and competitors"
      });
    }
    
    // Business specific risks
    switch (businessType) {
      case 'cafe':
        risks.push({
          factor: "Labor Cost Volatility",
          impact: "Medium",
          description: "Rising minimum wages and competition for qualified staff could pressure margins"
        });
        
        if (advancedParams.rent > 3000) {
          risks.push({
            factor: "Location Dependency",
            impact: "High",
            description: "High rent creates dependency on consistent foot traffic and sales volume"
          });
        }
        break;
        
      case 'retail':
        risks.push({
          factor: "E-commerce Competition",
          impact: "High",
          description: "Increasing competition from online retailers threatens traditional retail models"
        });
        
        if (advancedParams.inventoryTurnover < 4) {
          risks.push({
            factor: "Inventory Obsolescence",
            impact: "Medium",
            description: "Slow inventory turnover increases risk of obsolescence and cash flow constraints"
          });
        }
        break;
        
      case 'service':
        risks.push({
          factor: "Talent Retention",
          impact: "High",
          description: "Business heavily dependent on retaining skilled professionals in competitive market"
        });
        
        if (advancedParams.utilizationRate > 85) {
          risks.push({
            factor: "Resource Burnout",
            impact: "Medium",
            description: "Consistently high utilization may lead to quality issues and staff turnover"
          });
        }
        break;
        
      case 'manufacturing':
        risks.push({
          factor: "Supply Chain Disruption",
          impact: "High",
          description: "Dependency on specific raw materials or suppliers creates vulnerability"
        });
        
        if (advancedParams.productionCapacity > 4000) {
          risks.push({
            factor: "Capacity Utilization",
            impact: "Medium",
            description: "High fixed costs require consistent production volume to maintain profitability"
          });
        }
        break;
        
      default:
        risks.push({
          factor: "Market Competition",
          impact: "Medium",
          description: "Increasing competition may pressure margins and customer acquisition"
        });
    }
    
    if (monthlyRevenue / investment < 0.15) {
      risks.push({
        factor: "Revenue to Investment Ratio",
        impact: "High",
        description: "Low monthly revenue relative to initial investment creates financial strain"
      });
    }
    
    return risks;
  };
  
  // Generate recommendations based on business type and results
  const generateRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    // Financial recommendations based on metrics
    if ((results.monthlyProfit / monthlyRevenue) * 100 < 15) {
      recommendations.push({
        area: "Profitability",
        action: "Implement strategic pricing review and cost optimization",
        impact: "Potential 3-5% margin improvement within 6 months"
      });
    }
    
    // Business specific recommendations
    switch (businessType) {
      case 'cafe':
        recommendations.push({
          area: "Menu Engineering",
          action: "Analyze menu profitability and redesign to highlight high-margin items",
          impact: "Potential 8-10% increase in average ticket size"
        });
        
        if (advancedParams.staffCount > 3) {
          recommendations.push({
            area: "Staff Productivity",
            action: "Implement performance-based incentives and optimized scheduling",
            impact: "Potential 10-15% improvement in labor efficiency"
          });
        }
        break;
        
      case 'retail':
        recommendations.push({
          area: "Inventory Management",
          action: "Implement data-driven inventory forecasting and automated reordering",
          impact: "Potential 20% reduction in carrying costs while maintaining availability"
        });
        
        if (advancedParams.salesPerSqFt < 350) {
          recommendations.push({
            area: "Store Layout",
            action: "Optimize floor plan and product placement based on customer journey analysis",
            impact: "Potential 15-20% increase in sales per square foot"
          });
        }
        break;
        
      case 'service':
        recommendations.push({
          area: "Service Packaging",
          action: "Develop tiered service offerings with clear value differentiation",
          impact: "Potential 15% increase in average project value"
        });
        
        if (advancedParams.utilizationRate < 70) {
          recommendations.push({
            area: "Resource Utilization",
            action: "Implement advanced project management and capacity planning tools",
            impact: "Potential 15-20% increase in billable hours"
          });
        }
        break;
        
      case 'manufacturing':
        recommendations.push({
          area: "Production Efficiency",
          action: "Implement lean manufacturing principles and process automation",
          impact: "Potential 12-15% reduction in unit production costs"
        });
        
        if (advancedParams.defectRate > 2) {
          recommendations.push({
            area: "Quality Control",
            action: "Establish statistical process control and preventive maintenance program",
            impact: "Potential 40-60% reduction in defect rate and associated costs"
          });
        }
        break;
        
      default:
        recommendations.push({
          area: "Strategic Planning",
          action: "Develop comprehensive business plan with clear KPIs and accountability",
          impact: "Enhanced focus and measurable progress toward financial goals"
        });
    }
    
    // Add a technology recommendation
    const businessSpecificTech = getBusinessSpecificTech(businessType);
    recommendations.push({
      area: "Technology Investment",
      action: `Implement ${businessSpecificTech} to streamline operations`,
      impact: "Potential 15-20% improvement in operational efficiency and data insights"
    });
    
    return recommendations;
  };
  
  // Helper for technology recommendations
  const getBusinessSpecificTech = (type) => {
    switch (type) {
      case 'cafe':
        return "point-of-sale system with inventory and customer relationship management";
      case 'retail':
        return "integrated inventory management and customer analytics platform";
      case 'service':
        return "project management and resource allocation software";
      case 'manufacturing':
        return "production planning and control system with real-time analytics";
      default:
        return "enterprise resource planning system";
    }
  };
  
  // Input slider component
  const ParameterSlider = ({ label, value, onChange, min, max, step, formatter }) => {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ fontWeight: 500 }}>{label}</label>
          <span style={{ fontWeight: 600, color: 'var(--primary-main, #3B82F6)' }}>
            {formatter ? formatter(value) : value}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
    );
  };
  
  // Collapsible section component
  const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
      <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border-light, #E5E7EB)', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <div 
          style={{ 
            padding: '1rem', 
            background: 'var(--bg-light, #F8FAFC)', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            borderBottom: isOpen ? '1px solid var(--border-light, #E5E7EB)' : 'none'
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <h4 style={{ margin: 0, fontWeight: 600 }}>{title}</h4>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
        
        {isOpen && (
          <div style={{ padding: '1rem' }}>
            {children}
          </div>
        )}
      </div>
    );
  };
  
  // Chart colors
  const getColors = () => {
    switch (businessType) {
      case 'cafe':
        return ['#8E44AD', '#9B59B6', '#AF7AC5', '#BB8FCE', '#D2B4DE'];
      case 'retail':
        return ['#2980B9', '#3498DB', '#5DADE2', '#85C1E9', '#AED6F1'];
      case 'service':
        return ['#16A085', '#1ABC9C', '#48C9B0', '#76D7C4', '#A3E4D7'];
      case 'manufacturing':
        return ['#D35400', '#E67E22', '#EB984E', '#F0B27A', '#F5CBA7'];
      default:
        return ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
    }
  };

  // Dashboard content component
  const DashboardContent = () => {
    const COLORS = getColors();
    
    return (
      <>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2>Financial Dashboard</h2>
          <p style={{ color: 'var(--text-light)' }}>
            Adjust the parameters below to see how they affect your business financials.
          </p>
        </div>
      
        <div className="calculator-controls" style={{
          background: 'white',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Business Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {businessTypes.map(type => (
                <button 
                  key={type.id}
                  style={{
                    padding: '0.625rem 1rem',
                    background: businessType === type.id ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                    border: businessType === type.id ? '2px solid var(--primary)' : '2px solid transparent',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: businessType === type.id ? 600 : 400,
                    color: businessType === type.id ? 'var(--primary)' : 'var(--text-dark)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onClick={() => setBusinessType(type.id)}
                >
                  <FontAwesomeIcon icon={type.icon} /> {type.name}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <ParameterSlider
                label="Initial Investment"
                value={investment}
                onChange={setInvestment}
                min={10000}
                max={1000000}
                step={10000}
                formatter={formatCurrency}
              />
              
              <ParameterSlider
                label="Monthly Revenue"
                value={monthlyRevenue}
                onChange={setMonthlyRevenue}
                min={5000}
                max={200000}
                step={1000}
                formatter={formatCurrency}
              />
              
              <ParameterSlider
                label="Monthly Operating Costs"
                value={operatingCosts}
                onChange={setOperatingCosts}
                min={1000}
                max={150000}
                step={1000}
                formatter={formatCurrency}
              />
            </div>
            
            <div>
              <ParameterSlider
                label="Annual Growth Rate (%)"
                value={growthRate}
                onChange={setGrowthRate}
                min={0}
                max={30}
                step={0.5}
                formatter={(value) => `${value}%`}
              />
              
              <ParameterSlider
                label="Annual Inflation Rate (%)"
                value={inflationRate}
                onChange={setInflationRate}
                min={0}
                max={10}
                step={0.1}
                formatter={(value) => `${value}%`}
              />
              
              <ParameterSlider
                label="Tax Rate (%)"
                value={taxRate}
                onChange={setTaxRate}
                min={0}
                max={40}
                step={1}
                formatter={(value) => `${value}%`}
              />
            </div>
          </div>
          
          <CollapsibleSection title="Advanced Parameters">
            {businessType === 'cafe' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ParameterSlider
                  label="Seating Capacity"
                  value={advancedParams.seatingCapacity}
                  onChange={(value) => handleAdvancedParamChange('seatingCapacity', value)}
                  min={10}
                  max={100}
                />
                
                <ParameterSlider
                  label="Average Ticket ($)"
                  value={advancedParams.avgTicket}
                  onChange={(value) => handleAdvancedParamChange('avgTicket', value)}
                  min={5}
                  max={50}
                  step={0.5}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                
                <ParameterSlider
                  label="Table Turnover Rate"
                  value={advancedParams.turnoverRate}
                  onChange={(value) => handleAdvancedParamChange('turnoverRate', value)}
                  min={1}
                  max={8}
                  step={0.1}
                  formatter={(value) => value.toFixed(1)}
                />
                
                <ParameterSlider
                  label="Staff Count"
                  value={advancedParams.staffCount}
                  onChange={(value) => handleAdvancedParamChange('staffCount', value)}
                  min={1}
                  max={20}
                />
                
                <ParameterSlider
                  label="Food Cost (%)"
                  value={advancedParams.foodCost}
                  onChange={(value) => handleAdvancedParamChange('foodCost', value)}
                  min={15}
                  max={45}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Beverage Cost (%)"
                  value={advancedParams.beverageCost}
                  onChange={(value) => handleAdvancedParamChange('beverageCost', value)}
                  min={10}
                  max={40}
                  formatter={(value) => `${value}%`}
                />
              </div>
            )}
            
            {businessType === 'retail' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ParameterSlider
                  label="Square Footage"
                  value={advancedParams.squareFootage}
                  onChange={(value) => handleAdvancedParamChange('squareFootage', value)}
                  min={500}
                  max={5000}
                  step={100}
                />
                
                <ParameterSlider
                  label="Sales per Sq Ft ($)"
                  value={advancedParams.salesPerSqFt}
                  onChange={(value) => handleAdvancedParamChange('salesPerSqFt', value)}
                  min={100}
                  max={1000}
                  step={10}
                  formatter={(value) => `$${value}`}
                />
                
                <ParameterSlider
                  label="Inventory Turnover"
                  value={advancedParams.inventoryTurnover}
                  onChange={(value) => handleAdvancedParamChange('inventoryTurnover', value)}
                  min={1}
                  max={12}
                  step={0.1}
                  formatter={(value) => value.toFixed(1)}
                />
                
                <ParameterSlider
                  label="Shrinkage (%)"
                  value={advancedParams.shrinkage}
                  onChange={(value) => handleAdvancedParamChange('shrinkage', value)}
                  min={0.5}
                  max={5}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </div>
            )}
            
            {businessType === 'service' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ParameterSlider
                  label="Billable Hours (monthly)"
                  value={advancedParams.billableHours}
                  onChange={(value) => handleAdvancedParamChange('billableHours', value)}
                  min={80}
                  max={250}
                  step={5}
                />
                
                <ParameterSlider
                  label="Hourly Rate ($)"
                  value={advancedParams.hourlyRate}
                  onChange={(value) => handleAdvancedParamChange('hourlyRate', value)}
                  min={50}
                  max={300}
                  step={5}
                  formatter={(value) => `$${value}`}
                />
                
                <ParameterSlider
                  label="Utilization Rate (%)"
                  value={advancedParams.utilizationRate}
                  onChange={(value) => handleAdvancedParamChange('utilizationRate', value)}
                  min={50}
                  max={90}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Employee Count"
                  value={advancedParams.employeeCount}
                  onChange={(value) => handleAdvancedParamChange('employeeCount', value)}
                  min={1}
                  max={30}
                />
              </div>
            )}
            
            {businessType === 'manufacturing' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <ParameterSlider
                  label="Production Capacity"
                  value={advancedParams.productionCapacity}
                  onChange={(value) => handleAdvancedParamChange('productionCapacity', value)}
                  min={1000}
                  max={10000}
                  step={100}
                />
                
                <ParameterSlider
                  label="Material Cost (%)"
                  value={advancedParams.materialCostPercent}
                  onChange={(value) => handleAdvancedParamChange('materialCostPercent', value)}
                  min={20}
                  max={70}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Labor Cost (%)"
                  value={advancedParams.laborCostPercent}
                  onChange={(value) => handleAdvancedParamChange('laborCostPercent', value)}
                  min={10}
                  max={50}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Defect Rate (%)"
                  value={advancedParams.defectRate}
                  onChange={(value) => handleAdvancedParamChange('defectRate', value)}
                  min={0.5}
                  max={10}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </div>
            )}
          </CollapsibleSection>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                value={currentScenarioName}
                onChange={(e) => setCurrentScenarioName(e.target.value)}
                placeholder="Scenario Name"
                style={{
                  padding: '0.625rem 1rem',
                  border: '1px solid var(--border-main, #D1D5DB)',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={saveScenario}
                style={{
                  padding: '0.625rem 1rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon={faSave} /> Save Scenario
              </button>
            </div>
            
            {scenarios.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const scenario = scenarios.find(s => s.id.toString() === e.target.value);
                    if (scenario) loadScenario(scenario);
                  }
                }}
                style={{
                  padding: '0.625rem 1rem',
                  border: '1px solid var(--border-main, #D1D5DB)',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
                value=""
              >
                <option value="">Load Scenario</option>
                {scenarios.map(scenario => (
                  <option key={scenario.id} value={scenario.id}>{scenario.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        
        {results && (
          <div className="metrics-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div className="metric-card" style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.25rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="metric-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--primary-main, #3B82F6)'
              }}>
                <FontAwesomeIcon icon={faMoneyBillWave} size="lg" />
              </div>
              <div className="metric-label" style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6B7280)',
                margin: 0
              }}>Monthly Revenue</div>
              <h3 className="metric-value" style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: '0.5rem 0',
                color: 'var(--text-primary, #111827)'
              }}>{formatCurrency(monthlyRevenue)}</h3>
              <div className="metric-change" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--success, #10B981)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <FontAwesomeIcon icon={faChartLine} />
                +{growthRate}% annual growth
              </div>
            </div>
            
            <div className="metric-card" style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.25rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="metric-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--secondary-main, #10B981)'
              }}>
                <FontAwesomeIcon icon={faChartPie} size="lg" />
              </div>
              <div className="metric-label" style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6B7280)',
                margin: 0
              }}>Profit Margin</div>
              <h3 className="metric-value" style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: '0.5rem 0',
                color: 'var(--text-primary, #111827)'
              }}>{((results.monthlyProfit / monthlyRevenue) * 100).toFixed(1)}%</h3>
              <div className="metric-change" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: monthlyRevenue > operatingCosts ? 'var(--success, #10B981)' : 'var(--error, #EF4444)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <FontAwesomeIcon icon={monthlyRevenue > operatingCosts ? faChartLine : faChartArea} />
                {formatCurrency(results.monthlyProfit)} monthly profit
              </div>
            </div>
            
            <div className="metric-card" style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.25rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="metric-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--accent-main, #F59E0B)'
              }}>
                <FontAwesomeIcon icon={faChartLine} size="lg" />
              </div>
              <div className="metric-label" style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6B7280)',
                margin: 0
              }}>ROI</div>
              <h3 className="metric-value" style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: '0.5rem 0',
                color: 'var(--text-primary, #111827)'
              }}>{results.roi.toFixed(1)}%</h3>
              <div className="metric-change" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary, #6B7280)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Annual return on investment
              </div>
            </div>
            
            <div className="metric-card" style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.25rem',
              transition: 'all 0.3s ease'
            }}>
              <div className="metric-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--secondary-main, #10B981)'
              }}>
                <FontAwesomeIcon icon={faClock} size="lg" />
              </div>
              <div className="metric-label" style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6B7280)',
                margin: 0
              }}>Payback Period</div>
              <h3 className="metric-value" style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: '0.5rem 0',
                color: 'var(--text-primary, #111827)'
              }}>{results.paybackPeriod.toFixed(1)} months</h3>
              <div className="metric-change" style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: results.paybackPeriod < 24 ? 'var(--success, #10B981)' : 'var(--text-secondary, #6B7280)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {results.paybackPeriod < 24 ? 'Good payback time' : 'Consider optimizing'}
              </div>
            </div>
          </div>
        )}
      
        <div className="chart-container" style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          marginBottom: '1.5rem',
          overflow: 'hidden'
        }}>
          <div className="chart-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-light, #E5E7EB)'
          }}>
            <h3 className="chart-title" style={{
              margin: 0,
              fontSize: '1.125rem',
              fontWeight: 600
            }}>Financial Projections</h3>
          </div>
          <div className="chart-content" style={{
            padding: '1.5rem',
            height: '400px'
          }}>
            {results ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.fiveYearProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="costs" name="Costs" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke={COLORS[4]} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--text-secondary, #6B7280)'
              }}>
                Loading projections...
              </div>
            )}
          </div>
        </div>
        
        <div className="insights-container" style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          marginBottom: '1.5rem',
          overflow: 'hidden'
        }}>
          <div className="insights-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-light, #E5E7EB)'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
              AI-Powered Insights
            </h3>
            <button 
              onClick={generateAIInsights}
              disabled={isGeneratingInsights}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                background: 'var(--secondary-main, #10B981)',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: isGeneratingInsights ? 0.7 : 1
              }}
            >
              <FontAwesomeIcon icon={isGeneratingInsights ? faSyncAlt : faBrain} spin={isGeneratingInsights} />
              {isGeneratingInsights ? 'Generating...' : 'Generate Insights'}
            </button>
          </div>
          <div className="insights-content" style={{ padding: '1.5rem' }}>
            {aiInsights ? (
              <div className="insights-list">
                <div style={{ 
                  padding: '1rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  borderLeft: '4px solid var(--primary-main, #3B82F6)',
                  borderRadius: '0 0.5rem 0.5rem 0',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ 
                    margin: '0 0 0.75rem', 
                    color: 'var(--primary-dark, #2563EB)' 
                  }}>Executive Summary</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
                    {aiInsights.summary}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  <div className="insight-item" style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    borderLeft: '4px solid var(--secondary-main, #10B981)',
                    transition: 'all 0.2s ease'
                  }}>
                    <h4 style={{
                      margin: '0 0 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--secondary-main, #10B981)'
                    }}>
                      <FontAwesomeIcon icon={faRocket} />
                      Opportunities
                    </h4>
                    <ul style={{ 
                      margin: 0, 
                      padding: '0 0 0 1.25rem',
                      color: 'var(--text-secondary, #6B7280)'
                    }}>
                      {aiInsights.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="insight-item" style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderLeft: '4px solid var(--error, #EF4444)',
                    transition: 'all 0.2s ease'
                  }}>
                    <h4 style={{
                      margin: '0 0 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--error, #EF4444)'
                    }}>
                      <FontAwesomeIcon icon={faBalanceScale} />
                      Risk Factors
                    </h4>
                    <ul style={{ 
                      margin: 0, 
                      padding: '0 0 0 1.25rem',
                      color: 'var(--text-secondary, #6B7280)'
                    }}>
                      {aiInsights.risks.map((risk, index) => (
                        <li key={index}>
                          <strong>{risk.factor}</strong> ({risk.impact} impact): {risk.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                color: 'var(--text-secondary, #6B7280)'
              }}>
                {isGeneratingInsights ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem', color: 'var(--primary-main, #3B82F6)' }}>
                      <FontAwesomeIcon icon={faSyncAlt} spin />
                    </div>
                    <p>Analyzing your business model and generating insights...</p>
                  </div>
                ) : (
                  <>
                    <p>Click "Generate Insights" to receive AI-powered analysis and recommendations for your business model.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // Revenue content component
  const RevenueContent = () => {
    const COLORS = getColors();
    
    // Handle revenue stream change
    const handleRevenueStreamChange = (index, field, value) => {
      const newStreams = [...revenueStreams];
      newStreams[index][field] = value;
      
      // If changing percentage, normalize to ensure sum = 100%
      if (field === 'percentage') {
        const sum = newStreams.reduce((acc, stream) => acc + stream.percentage, 0);
        if (sum !== 100) {
          // Adjust other streams proportionally
          const adjustment = (100 - value) / (sum - newStreams[index].percentage);
          newStreams.forEach((stream, i) => {
            if (i !== index) {
              stream.percentage = Math.round(stream.percentage * adjustment);
            }
          });
          
          // Ensure exactly 100% by adjusting last stream if needed
          const finalSum = newStreams.reduce((acc, stream) => acc + stream.percentage, 0);
          if (finalSum !== 100) {
            const lastIndex = newStreams.length - 1 === index ? newStreams.length - 2 : newStreams.length - 1;
            if (lastIndex >= 0) {
              newStreams[lastIndex].percentage += (100 - finalSum);
            }
          }
        }
      }
      
      setRevenueStreams(newStreams);
    };
    
    // Add new revenue stream
    const addRevenueStream = () => {
      if (revenueStreams.length >= 5) return; // Maximum 5 streams
      
      // Calculate a default percentage that's proportionally from other streams
      const defaultPercentage = Math.floor(100 / (revenueStreams.length + 1));
      
      // Adjust existing streams
      const adjustment = (100 - defaultPercentage) / 100;
      const newStreams = revenueStreams.map(stream => ({
        ...stream,
        percentage: Math.floor(stream.percentage * adjustment)
      }));
      
      // Add new stream
      newStreams.push({
        name: `Stream ${revenueStreams.length + 1}`,
        percentage: defaultPercentage,
        growth: 5
      });
      
      // Ensure exactly 100%
      const sum = newStreams.reduce((acc, stream) => acc + stream.percentage, 0);
      if (sum !== 100) {
        newStreams[0].percentage += (100 - sum);
      }
      
      setRevenueStreams(newStreams);
    };
    
    // Remove revenue stream
    const removeRevenueStream = (index) => {
      if (revenueStreams.length <= 1) return; // At least one stream required
      
      const streamToRemove = revenueStreams[index];
      const newStreams = revenueStreams.filter((_, i) => i !== index);
      
      // Redistribute the percentage
      const adjustment = 100 / (100 - streamToRemove.percentage);
      newStreams.forEach(stream => {
        stream.percentage = Math.round(stream.percentage * adjustment);
      });
      
      // Ensure exactly 100%
      const sum = newStreams.reduce((acc, stream) => acc + stream.percentage, 0);
      if (sum !== 100) {
        newStreams[0].percentage += (100 - sum);
      }
      
      setRevenueStreams(newStreams);
    };
    
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
          <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: '0.75rem' }} />
          Revenue Analysis
        </h2>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: 0 }}>Revenue Settings</h3>
            <div>
              <ParameterSlider
                label="Monthly Revenue"
                value={monthlyRevenue}
                onChange={setMonthlyRevenue}
                min={5000}
                max={200000}
                step={1000}
                formatter={formatCurrency}
              />
              
              <ParameterSlider
                label="Annual Growth Rate (%)"
                value={growthRate}
                onChange={setGrowthRate}
                min={0}
                max={30}
                step={0.5}
                formatter={(value) => `${value}%`}
              />
            </div>
          </div>
          
          <h3 style={{ marginBottom: '1rem' }}>Revenue Streams</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <p style={{ margin: 0, color: 'var(--text-light)' }}>
                Set up your revenue streams and their relative contributions
              </p>
              {revenueStreams.length < 5 && (
                <button
                  onClick={addRevenueStream}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Add Revenue Stream
                </button>
              )}
            </div>
            
            {revenueStreams.map((stream, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid var(--border-light)',
                borderRadius: '0.5rem',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Stream Name
                  </label>
                  <input
                    type="text"
                    value={stream.name}
                    onChange={(e) => handleRevenueStreamChange(index, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={stream.percentage}
                    onChange={(e) => handleRevenueStreamChange(index, 'percentage', parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={stream.growth}
                    onChange={(e) => handleRevenueStreamChange(index, 'growth', parseFloat(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Amount
                  </label>
                  <div style={{
                    padding: '0.625rem',
                    border: '1px solid var(--border-main)',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    background: 'var(--bg-light)',
                    fontWeight: 600
                  }}>
                    {formatCurrency((stream.percentage / 100) * monthlyRevenue)}
                  </div>
                </div>
                
                {revenueStreams.length > 1 && (
                  <button
                    onClick={() => removeRevenueStream(index)}
                    style={{
                      padding: '0.625rem',
                      background: 'transparent',
                      color: 'var(--error)',
                      border: '1px solid var(--error)',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ height: '300px' }}>
              {results && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.revenueStreamData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {results.revenueStreamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Revenue Growth Projections</h4>
              {results && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={results.revenueStreamData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="growth" fill={COLORS[1]}>
                      {results.revenueStreamData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Revenue Optimization</h3>
          
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
            Adjust these parameters to simulate different revenue optimization strategies
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {businessType === 'cafe' && (
              <>
                <ParameterSlider
                  label="Average Ticket ($)"
                  value={advancedParams.avgTicket}
                  onChange={(value) => handleAdvancedParamChange('avgTicket', value)}
                  min={5}
                  max={50}
                  step={0.5}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                
                <ParameterSlider
                  label="Table Turnover Rate"
                  value={advancedParams.turnoverRate}
                  onChange={(value) => handleAdvancedParamChange('turnoverRate', value)}
                  min={1}
                  max={8}
                  step={0.1}
                  formatter={(value) => value.toFixed(1)}
                />
                
                <ParameterSlider
                  label="Seating Capacity"
                  value={advancedParams.seatingCapacity}
                  onChange={(value) => handleAdvancedParamChange('seatingCapacity', value)}
                  min={10}
                  max={100}
                />
              </>
            )}
            
            {businessType === 'retail' && (
              <>
                <ParameterSlider
                  label="Sales per Square Foot ($)"
                  value={advancedParams.salesPerSqFt}
                  onChange={(value) => handleAdvancedParamChange('salesPerSqFt', value)}
                  min={100}
                  max={1000}
                  step={10}
                  formatter={(value) => `$${value}`}
                />
                
                <ParameterSlider
                  label="Inventory Turnover"
                  value={advancedParams.inventoryTurnover}
                  onChange={(value) => handleAdvancedParamChange('inventoryTurnover', value)}
                  min={1}
                  max={12}
                  step={0.1}
                  formatter={(value) => value.toFixed(1)}
                />
                
                <ParameterSlider
                  label="Shrinkage (%)"
                  value={advancedParams.shrinkage}
                  onChange={(value) => handleAdvancedParamChange('shrinkage', value)}
                  min={0.5}
                  max={5}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </>
            )}
            
            {businessType === 'service' && (
              <>
                <ParameterSlider
                  label="Hourly Rate ($)"
                  value={advancedParams.hourlyRate}
                  onChange={(value) => handleAdvancedParamChange('hourlyRate', value)}
                  min={50}
                  max={300}
                  step={5}
                  formatter={(value) => `$${value}`}
                />
                
                <ParameterSlider
                  label="Utilization Rate (%)"
                  value={advancedParams.utilizationRate}
                  onChange={(value) => handleAdvancedParamChange('utilizationRate', value)}
                  min={50}
                  max={90}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Billable Hours (monthly)"
                  value={advancedParams.billableHours}
                  onChange={(value) => handleAdvancedParamChange('billableHours', value)}
                  min={80}
                  max={250}
                  step={5}
                />
              </>
            )}
            
            {businessType === 'manufacturing' && (
              <>
                <ParameterSlider
                  label="Production Capacity"
                  value={advancedParams.productionCapacity}
                  onChange={(value) => handleAdvancedParamChange('productionCapacity', value)}
                  min={1000}
                  max={10000}
                  step={100}
                />
                
                <ParameterSlider
                  label="Material Cost (%)"
                  value={advancedParams.materialCostPercent}
                  onChange={(value) => handleAdvancedParamChange('materialCostPercent', value)}
                  min={20}
                  max={70}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Defect Rate (%)"
                  value={advancedParams.defectRate}
                  onChange={(value) => handleAdvancedParamChange('defectRate', value)}
                  min={0.5}
                  max={10}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </>
            )}
          </div>
          
          {results && (
            <div style={{
              background: 'rgba(37, 99, 235, 0.05)',
              borderLeft: '4px solid var(--primary-main, #3B82F6)',
              padding: '1rem',
              borderRadius: '0 0.5rem 0.5rem 0',
            }}>
              <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-dark, #2563EB)' }}>Revenue Optimization Insights</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
                {businessType === 'cafe' && (
                  `Increasing your average ticket by $1 would generate an additional ${formatCurrency(advancedParams.seatingCapacity * advancedParams.turnoverRate * 30)} in monthly revenue. Improving table turnover rate by 0.5 would result in ${formatCurrency(advancedParams.seatingCapacity * 0.5 * advancedParams.avgTicket * 30)} additional monthly revenue.`
                )}
                {businessType === 'retail' && (
                  `Increasing sales per square foot by $50 would generate an additional ${formatCurrency(advancedParams.squareFootage * 50)} in monthly revenue. Reducing shrinkage by 1% would save approximately ${formatCurrency(monthlyRevenue * 0.01)} per month.`
                )}
                {businessType === 'service' && (
                  `Increasing your hourly rate by $10 would generate an additional ${formatCurrency(advancedParams.billableHours * advancedParams.employeeCount * 10)} in monthly revenue. Improving utilization rate by 5% would result in ${formatCurrency(advancedParams.hourlyRate * advancedParams.billableHours * 0.05 * advancedParams.employeeCount)} additional monthly revenue.`
                )}
                {businessType === 'manufacturing' && (
                  `Increasing production capacity by 500 units would generate an additional ${formatCurrency(500 * (monthlyRevenue / advancedParams.productionCapacity))} in monthly revenue. Reducing defect rate by 1% would save approximately ${formatCurrency(monthlyRevenue * 0.01)} per month.`
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Expenses content component
  const ExpensesContent = () => {
    const COLORS = getColors();
    
    // Handle expense category change
    const handleExpenseCategoryChange = (index, field, value) => {
      const newCategories = [...expenseCategories];
      newCategories[index][field] = value;
      
      // If changing percentage, normalize to ensure sum = 100%
      if (field === 'percentage') {
        const sum = newCategories.reduce((acc, category) => acc + category.percentage, 0);
        if (sum !== 100) {
          // Adjust other categories proportionally
          const adjustment = (100 - value) / (sum - newCategories[index].percentage);
          newCategories.forEach((category, i) => {
            if (i !== index) {
              category.percentage = Math.round(category.percentage * adjustment);
            }
          });
          
          // Ensure exactly 100% by adjusting last category if needed
          const finalSum = newCategories.reduce((acc, category) => acc + category.percentage, 0);
          if (finalSum !== 100) {
            const lastIndex = newCategories.length - 1 === index ? newCategories.length - 2 : newCategories.length - 1;
            if (lastIndex >= 0) {
              newCategories[lastIndex].percentage += (100 - finalSum);
            }
          }
        }
      }
      
      setExpenseCategories(newCategories);
    };
    
    // Add new expense category
    const addExpenseCategory = () => {
      if (expenseCategories.length >= 8) return; // Maximum 8 categories
      
      // Calculate a default percentage that's proportionally from other categories
      const defaultPercentage = Math.floor(100 / (expenseCategories.length + 1));
      
      // Adjust existing categories
      const adjustment = (100 - defaultPercentage) / 100;
      const newCategories = expenseCategories.map(category => ({
        ...category,
        percentage: Math.floor(category.percentage * adjustment)
      }));
      
      // Add new category
      newCategories.push({
        name: `Expense ${expenseCategories.length + 1}`,
        percentage: defaultPercentage,
        reducible: 10
      });
      
      // Ensure exactly 100%
      const sum = newCategories.reduce((acc, category) => acc + category.percentage, 0);
      if (sum !== 100) {
        newCategories[0].percentage += (100 - sum);
      }
      
      setExpenseCategories(newCategories);
    };
    
    // Remove expense category
    const removeExpenseCategory = (index) => {
      if (expenseCategories.length <= 2) return; // At least two categories required
      
      const categoryToRemove = expenseCategories[index];
      const newCategories = expenseCategories.filter((_, i) => i !== index);
      
      // Redistribute the percentage
      const adjustment = 100 / (100 - categoryToRemove.percentage);
      newCategories.forEach(category => {
        category.percentage = Math.round(category.percentage * adjustment);
      });
      
      // Ensure exactly 100%
      const sum = newCategories.reduce((acc, category) => acc + category.percentage, 0);
      if (sum !== 100) {
        newCategories[0].percentage += (100 - sum);
      }
      
      setExpenseCategories(newCategories);
    };
    
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary-main, #10B981)' }}>
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '0.75rem' }} />
          Expense Analysis
        </h2>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: 0 }}>Expense Settings</h3>
            <div>
              <ParameterSlider
                label="Monthly Operating Costs"
                value={operatingCosts}
                onChange={setOperatingCosts}
                min={1000}
max={150000}
                step={1000}
                formatter={formatCurrency}
              />
              
              <ParameterSlider
                label="Annual Inflation Rate (%)"
                value={inflationRate}
                onChange={setInflationRate}
                min={0}
                max={10}
                step={0.1}
                formatter={(value) => `${value}%`}
              />
            </div>
          </div>
          
          <h3 style={{ marginBottom: '1rem' }}>Expense Categories</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <p style={{ margin: 0, color: 'var(--text-light)' }}>
                Set up your expense categories and their relative contributions
              </p>
              {expenseCategories.length < 8 && (
                <button
                  onClick={addExpenseCategory}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--secondary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Add Expense Category
                </button>
              )}
            </div>
            
            {expenseCategories.map((category, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '1rem',
                padding: '1rem',
                border: '1px solid var(--border-light)',
                borderRadius: '0.5rem',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => handleExpenseCategoryChange(index, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={category.percentage}
                    onChange={(e) => handleExpenseCategoryChange(index, 'percentage', parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Reducible (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={category.reducible}
                    onChange={(e) => handleExpenseCategoryChange(index, 'reducible', parseFloat(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid var(--border-main)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                
                <div style={{ width: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    Amount
                  </label>
                  <div style={{
                    padding: '0.625rem',
                    border: '1px solid var(--border-main)',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    background: 'var(--bg-light)',
                    fontWeight: 600
                  }}>
                    {formatCurrency((category.percentage / 100) * operatingCosts)}
                  </div>
                </div>
                
                {expenseCategories.length > 2 && (
                  <button
                    onClick={() => removeExpenseCategory(index)}
                    style={{
                      padding: '0.625rem',
                      background: 'transparent',
                      color: 'var(--error)',
                      border: '1px solid var(--error)',
                      borderRadius: '0.375rem',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ height: '300px' }}>
              {results && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.expenseCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {results.expenseCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Potential Cost Reductions</h4>
              {results && (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={results.expenseCategoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="reducible" fill={COLORS[2]}>
                      {results.expenseCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Cost Optimization Opportunities</h3>
          
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            borderLeft: '4px solid var(--secondary-main, #10B981)',
            padding: '1rem',
            borderRadius: '0 0.5rem 0.5rem 0',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--secondary-main, #10B981)' }}>Cost Optimization Insights</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
              Based on your inputs, you could potentially reduce costs by approximately {formatCurrency(
                results ? results.expenseCategoryData.reduce((acc, cat) => acc + cat.reducible, 0) : 0
              )} per month through efficiency improvements and strategic reductions across categories.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {businessType === 'cafe' && (
              <>
                <ParameterSlider
                  label="Staff Count"
                  value={advancedParams.staffCount}
                  onChange={(value) => handleAdvancedParamChange('staffCount', value)}
                  min={1}
                  max={20}
                />
                
                <ParameterSlider
                  label="Average Staff Wage ($)"
                  value={advancedParams.avgStaffWage}
                  onChange={(value) => handleAdvancedParamChange('avgStaffWage', value)}
                  min={8}
                  max={30}
                  step={0.5}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                
                <ParameterSlider
                  label="Food Cost (%)"
                  value={advancedParams.foodCost}
                  onChange={(value) => handleAdvancedParamChange('foodCost', value)}
                  min={15}
                  max={45}
                  formatter={(value) => `${value}%`}
                />
              </>
            )}
            
            {businessType === 'retail' && (
              <>
                <ParameterSlider
                  label="Staffing Cost (%)"
                  value={advancedParams.staffingCost}
                  onChange={(value) => handleAdvancedParamChange('staffingCost', value)}
                  min={5}
                  max={30}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Shrinkage (%)"
                  value={advancedParams.shrinkage}
                  onChange={(value) => handleAdvancedParamChange('shrinkage', value)}
                  min={0.5}
                  max={5}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </>
            )}
            
            {businessType === 'service' && (
              <>
                <ParameterSlider
                  label="Overhead Per Employee ($)"
                  value={advancedParams.overheadPerEmployee}
                  onChange={(value) => handleAdvancedParamChange('overheadPerEmployee', value)}
                  min={1000}
                  max={5000}
                  step={100}
                  formatter={formatCurrency}
                />
                
                <ParameterSlider
                  label="Utilization Rate (%)"
                  value={advancedParams.utilizationRate}
                  onChange={(value) => handleAdvancedParamChange('utilizationRate', value)}
                  min={50}
                  max={90}
                  formatter={(value) => `${value}%`}
                />
              </>
            )}
            
            {businessType === 'manufacturing' && (
              <>
                <ParameterSlider
                  label="Material Cost (%)"
                  value={advancedParams.materialCostPercent}
                  onChange={(value) => handleAdvancedParamChange('materialCostPercent', value)}
                  min={20}
                  max={70}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Labor Cost (%)"
                  value={advancedParams.laborCostPercent}
                  onChange={(value) => handleAdvancedParamChange('laborCostPercent', value)}
                  min={10}
                  max={50}
                  formatter={(value) => `${value}%`}
                />
                
                <ParameterSlider
                  label="Defect Rate (%)"
                  value={advancedParams.defectRate}
                  onChange={(value) => handleAdvancedParamChange('defectRate', value)}
                  min={0.5}
                  max={10}
                  step={0.1}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </>
            )}
          </div>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>Expense Category</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>Current Monthly</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>Potential Savings</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>Optimization Strategy</th>
              </tr>
            </thead>
            <tbody>
              {results && results.expenseCategoryData.map((category, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
                  <td style={{ padding: '0.75rem' }}>{category.name}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(category.value)}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                    {formatCurrency(category.reducible)}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {index === 0 ? 'Process optimization' : 
                     index === 1 ? 'Supplier negotiations' :
                     index === 2 ? 'Technology adoption' :
                     index === 3 ? 'Resource scheduling' :
                     'Efficiency improvements'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid var(--border-light, #E5E7EB)', fontWeight: 600 }}>
                <td style={{ padding: '0.75rem' }}>Total Potential Savings</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}></td>
                <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                  {formatCurrency(
                    results ? results.expenseCategoryData.reduce((acc, cat) => acc + cat.reducible, 0) : 0
                  )}
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  // Projections content component
  const ProjectionsContent = () => {
    const COLORS = getColors();
    const [chartView, setChartView] = useState('revenue');
    
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
          <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.75rem' }} />
          Financial Projections
        </h2>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: 0 }}>Projection Settings</h3>
            <div>
              <ParameterSlider
                label="Annual Growth Rate (%)"
                value={growthRate}
                onChange={setGrowthRate}
                min={0}
                max={30}
                step={0.5}
                formatter={(value) => `${value}%`}
              />
              
              <ParameterSlider
                label="Annual Inflation Rate (%)"
                value={inflationRate}
                onChange={setInflationRate}
                min={0}
                max={10}
                step={0.1}
                formatter={(value) => `${value}%`}
              />
              
              <ParameterSlider
                label="Discount Rate (%)"
                value={discountRate}
                onChange={setDiscountRate}
                min={0}
                max={20}
                step={0.5}
                formatter={(value) => `${value}%`}
              />
            </div>
          </div>
          
          <h3 style={{ marginBottom: '1rem' }}>5-Year Projections</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <button 
                style={{
                  padding: '0.625rem 1rem',
                  background: chartView === 'revenue' ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                  border: chartView === 'revenue' ? '2px solid var(--primary)' : '2px solid transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: chartView === 'revenue' ? 600 : 400,
                  color: chartView === 'revenue' ? 'var(--primary)' : 'var(--text-dark)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setChartView('revenue')}
              >
                Revenue & Profit
              </button>
              <button 
                style={{
                  padding: '0.625rem 1rem',
                  background: chartView === 'cumulative' ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                  border: chartView === 'cumulative' ? '2px solid var(--primary)' : '2px solid transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: chartView === 'cumulative' ? 600 : 400,
                  color: chartView === 'cumulative' ? 'var(--primary)' : 'var(--text-dark)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setChartView('cumulative')}
              >
                Cumulative Return
              </button>
              <button 
                style={{
                  padding: '0.625rem 1rem',
                  background: chartView === 'quarterly' ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                  border: chartView === 'quarterly' ? '2px solid var(--primary)' : '2px solid transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: chartView === 'quarterly' ? 600 : 400,
                  color: chartView === 'quarterly' ? 'var(--primary)' : 'var(--text-dark)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setChartView('quarterly')}
              >
                Quarterly Breakdown
              </button>
              <button 
                style={{
                  padding: '0.625rem 1rem',
                  background: chartView === 'breakeven' ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                  border: chartView === 'breakeven' ? '2px solid var(--primary)' : '2px solid transparent',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: chartView === 'breakeven' ? 600 : 400,
                  color: chartView === 'breakeven' ? 'var(--primary)' : 'var(--text-dark)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setChartView('breakeven')}
              >
                Break-even Analysis
              </button>
            </div>
            
            <div style={{ height: '400px' }}>
              {results && chartView === 'revenue' && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.fiveYearProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="costs" name="Costs" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke={COLORS[4]} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {results && chartView === 'cumulative' && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" type="number" domain={[1, 5]} tickCount={5} label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <defs>
                      <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      name="Cumulative Return"
                      stroke={COLORS[1]} 
                      fillOpacity={1} 
                      fill="url(#colorReturn)"
                      data={results.fiveYearProjection.map((year, index, arr) => ({
                        year: year.year,
                        profit: arr.slice(0, index + 1).reduce((acc, y) => acc + y.profit, 0) - investment
                      }))}
                    />
                    {/* Investment reference line */}
                    <Line 
                      type="monotone" 
                      dataKey="investment" 
                      name="Initial Investment" 
                      stroke="#FF5722" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      data={Array.from({ length: 5 }, (_, i) => ({ year: i + 1, investment: 0 }))}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
              
              {results && chartView === 'quarterly' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={
                    results.fiveYearProjection.flatMap(year => 
                      year.quarterlyRevenue.map((q, idx) => ({
                        quarter: `Y${year.year}Q${idx+1}`,
                        revenue: q.revenue,
                        costs: year.quarterlyCosts[idx].costs,
                        profit: q.revenue - year.quarterlyCosts[idx].costs
                      }))
                    )
                  }>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="quarter" />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill={COLORS[0]} />
                    <Bar dataKey="costs" name="Costs" fill={COLORS[2]} />
                    <Bar dataKey="profit" name="Profit" fill={COLORS[4]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              {results && chartView === 'breakeven' && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.breakEvenAnalysis.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[4]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS[4]} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="cumulativeProfit" name="Cumulative Return" stroke={COLORS[4]} fillOpacity={1} fill="url(#colorProfit)" />
                    {/* Zero reference line */}
                    <Line 
                      type="monotone" 
                      dataKey="zero" 
                      name="Break-even Point" 
                      stroke="#FF5722" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      data={Array.from({ length: 36 }, (_, i) => ({ month: i + 1, zero: 0 }))}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {results && (
              <>
                <div style={{
                  background: 'var(--bg-light, #F8FAFC)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light, #E5E7EB)'
                }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Year 5 Revenue</h4>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem',
                    color: 'var(--primary-main, #3B82F6)'
                  }}>
                    {formatCurrency(results.fiveYearProjection[4].revenue)}
                  </div>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                    {((results.fiveYearProjection[4].revenue / (monthlyRevenue * 12) - 1) * 100).toFixed(1)}% growth from Year 1
                  </p>
                </div>
                
                <div style={{
                  background: 'var(--bg-light, #F8FAFC)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light, #E5E7EB)'
                }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>5-Year Profit</h4>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem',
                    color: 'var(--secondary-main, #10B981)'
                  }}>
                    {formatCurrency(results.fiveYearProjection.reduce((acc, year) => acc + year.profit, 0))}
                  </div>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                    Cumulative 5-year profit
                  </p>
                </div>
                
                <div style={{
                  background: 'var(--bg-light, #F8FAFC)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light, #E5E7EB)'
                }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Break-even Point</h4>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem',
                    color: 'var(--accent-main, #F59E0B)'
                  }}>
                    {results.breakEvenAnalysis.months} months
                  </div>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                    Time to recover initial investment
                  </p>
                </div>
                
                <div style={{
                  background: 'var(--bg-light, #F8FAFC)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid var(--border-light, #E5E7EB)'
                }}>
                  <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Net Present Value</h4>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    marginBottom: '0.5rem',
                    color: 'var(--primary-dark, #2563EB)'
                  }}>
                    {formatCurrency(results.npv)}
                  </div>
                  <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                    Present value of future cash flows
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div style={{
          background: 'var(--background-card, white)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Sensitivity Analysis</h3>
          
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
            Adjust key parameters to see how changes might affect your financial outcomes
          </p>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
            marginBottom: '1.5rem'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem' }}>Scenario</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>Year 5 Revenue</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>5-Year Profit</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>NPV</th>
                <th style={{ textAlign: 'right', padding: '0.75rem' }}>Break-even</th>
              </tr>
            </thead>
            <tbody>
              {results && (
                <>
                  <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
                    <td style={{ padding: '0.75rem' }}>Base Case</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      {formatCurrency(results.fiveYearProjection[4].revenue)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      {formatCurrency(results.fiveYearProjection.reduce((acc, year) => acc + year.profit, 0))}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      {formatCurrency(results.npv)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      {results.breakEvenAnalysis.months} months
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
                    <td style={{ padding: '0.75rem' }}>Revenue +10%</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency(results.fiveYearProjection[4].revenue * 1.1)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency((results.fiveYearProjection.reduce((acc, year) => acc + year.profit, 0)) + (monthlyRevenue * 0.1 * 12 * 5))}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency(results.npv * 1.2)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {Math.floor(results.breakEvenAnalysis.months * 0.9)} months
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
                    <td style={{ padding: '0.75rem' }}>Costs +10%</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      {formatCurrency(results.fiveYearProjection[4].revenue)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>
                      {formatCurrency((results.fiveYearProjection.reduce((acc, year) => acc + year.profit, 0)) - (operatingCosts * 0.1 * 12 * 5))}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>
                      {formatCurrency(results.npv * 0.85)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>
                      {Math.floor(results.breakEvenAnalysis.months * 1.15)} months
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>Growth Rate +3%</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency(monthlyRevenue * 12 * Math.pow(1 + ((growthRate + 3) / 100), 5))}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency(results.fiveYearProjection.reduce((acc, year) => acc + year.profit, 0) * 1.15)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {formatCurrency(results.npv * 1.18)}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>
                      {results.breakEvenAnalysis.months} months
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-main, #3B82F6)',
            padding: '1rem',
            borderRadius: '0 0.5rem 0.5rem 0',
          }}>
            <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-dark, #2563EB)' }}>Sensitivity Analysis Insights</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
              Your business model shows the most sensitivity to revenue fluctuations. A 10% increase in revenue improves the NPV by approximately 20%, while a 10% increase in costs reduces NPV by approximately 15%. Focus on revenue growth strategies for maximum impact on long-term profitability.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // This function renders the appropriate content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'revenue':
        return <RevenueContent />;
      case 'expenses':
        return <ExpensesContent />;
      case 'projections':
        return <ProjectionsContent />;
      case 'insights':
        return (
          <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-main, #F59E0B)' }}>
              <FontAwesomeIcon icon={faBrain} style={{ marginRight: '0.75rem' }} />
              AI Financial Insights
            </h2>
            
            <div style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: 0 }}>Strategic Recommendations</h3>
                <button 
                  onClick={generateAIInsights}
                  disabled={isGeneratingInsights}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    background: 'var(--primary-main, #3B82F6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isGeneratingInsights ? 0.7 : 1
                  }}
                >
                  <FontAwesomeIcon icon={isGeneratingInsights ? faSyncAlt : faBrain} spin={isGeneratingInsights} />
                  {isGeneratingInsights ? 'Generating...' : 'Generate Insights'}
                </button>
              </div>
              
              {aiInsights ? (
                <>
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 1rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--primary-dark, #2563EB)'
                    }}>
                      <FontAwesomeIcon icon={faLightbulb} />
                      Executive Summary
                    </h4>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary, #6B7280)' }}>
                      {aiInsights.summary}
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      background: 'var(--bg-light, #F8FAFC)',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      border: '1px solid var(--border-light, #E5E7EB)'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 1rem', 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--secondary-main, #10B981)'
                      }}>
                        <FontAwesomeIcon icon={faRocket} />
                        Growth Strategies
                      </h4>
                      <ul style={{ 
                        margin: 0,
                        padding: '0 0 0 1.25rem',
                        color: 'var(--text-secondary, #6B7280)'
                      }}>
                        {aiInsights.opportunities.map((opportunity, index) => (
                          <li key={index} style={{ marginBottom: '0.75rem' }}>
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div style={{
                      background: 'var(--bg-light, #F8FAFC)',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      border: '1px solid var(--border-light, #E5E7EB)'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 1rem', 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--error, #EF4444)'
                      }}>
                        <FontAwesomeIcon icon={faBalanceScale} />
                        Risk Management
                      </h4>
                      <ul style={{ 
                        margin: 0,
                        padding: '0 0 0 1.25rem',
                        color: 'var(--text-secondary, #6B7280)'
                      }}>
                        {aiInsights.risks.map((risk, index) => (
                          <li key={index} style={{ marginBottom: '0.75rem' }}>
                            <strong>{risk.factor}</strong> ({risk.impact} impact): {risk.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <h3 style={{ marginBottom: '1.5rem' }}>Implementation Priority Matrix</h3>
                  
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.875rem'
                  }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Area</th>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Recommended Action</th>
                        <th style={{ textAlign: 'left', padding: '0.75rem' }}>Potential Impact</th>
                        <th style={{ textAlign: 'center', padding: '0.75rem' }}>Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aiInsights.recommendations.map((rec, index) => (
                        <tr key={index} style={{ 
                          borderBottom: index < aiInsights.recommendations.length - 1 ? '1px solid var(--border-light, #E5E7EB)' : 'none',
                          backgroundColor: index % 2 === 0 ? 'white' : 'var(--bg-light, #F8FAFC)'
                        }}>
                          <td style={{ padding: '0.75rem', fontWeight: 600 }}>{rec.area}</td>
                          <td style={{ padding: '0.75rem' }}>{rec.action}</td>
                          <td style={{ padding: '0.75rem', color: 'var(--success, #10B981)' }}>{rec.impact}</td>
                          <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                            <span style={{ 
                              display: 'inline-block',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: index === 0 ? 'var(--error, #EF4444)' : 
                                      index === 1 ? 'var(--accent, #F59E0B)' : 
                                      index === 2 ? 'var(--primary, #3B82F6)' : 
                                      'var(--secondary, #10B981)',
                              color: 'white',
                              textAlign: 'center',
                              lineHeight: '28px',
                              fontWeight: 600
                            }}>
                              {index + 1}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <div style={{ 
                  padding: '3rem', 
                  textAlign: 'center',
                  color: 'var(--text-secondary, #6B7280)'
                }}>
                  {isGeneratingInsights ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '3rem', color: 'var(--primary-main, #3B82F6)' }}>
                        <FontAwesomeIcon icon={faSyncAlt} spin />
                      </div>
                      <p>Analyzing your financial data and generating comprehensive insights...</p>
                      <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>This may take a few moments</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '3rem', color: 'var(--primary-main, #3B82F6)', marginBottom: '1rem' }}>
                        <FontAwesomeIcon icon={faBrain} />
                      </div>
                      <h3 style={{ marginBottom: '1rem' }}>Generate AI Insights</h3>
                      <p style={{ maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        Click the "Generate Insights" button to receive AI-powered analysis and strategic recommendations customized to your business model and financial parameters.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'history':
        return (
          <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
              <FontAwesomeIcon icon={faHistory} style={{ marginRight: '0.75rem' }} />
              Scenario Management
            </h2>
            
            <div style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Save Current Scenario</h3>
                <div style={{ 
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <input 
                    type="text"
                    value={currentScenarioName}
                    onChange={(e) => setCurrentScenarioName(e.target.value)}
                    placeholder="Scenario Name"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      border: '1px solid #e2e8f0',
                      flex: 1
                    }}
                  />
                  <button 
                    onClick={saveScenario}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FontAwesomeIcon icon={faSave} />
                    Save Scenario
                  </button>
                </div>
              </div>
              
              {scenarios.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Saved Scenarios</h3>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {scenarios.map(scenario => (
                      <div 
                        key={scenario.id}
                        style={{
                          background: 'var(--bg-light)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => loadScenario(scenario)}
                      >
                        <h4 style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{scenario.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                            Click to load
                          </span>
                        </h4>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                          <div>Business: {businessTypes.find(t => t.id === scenario.businessType)?.name}</div>
                          <div>Investment: {formatCurrency(scenario.investment)}</div>
                          <div>Monthly Revenue: {formatCurrency(scenario.monthlyRevenue)}</div>
                          <div>ROI: {scenario.results?.roi.toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {scenarios.length >= 2 && (
                    <div>
                      <h3 style={{ marginBottom: '1rem' }}>Scenarios Comparison</h3>
                      
                      <div style={{ 
                        background: 'var(--bg-light, #F8FAFC)',
                        borderRadius: '0.5rem',
                        overflow: 'auto',
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                              <th style={{ padding: '0.75rem', textAlign: 'left', position: 'sticky', left: 0, backgroundColor: 'var(--primary)' }}>Metric</th>
                              {scenarios.map(scenario => (
                                <th key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>{scenario.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'white' }}>Investment</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {formatCurrency(scenario.investment)}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'var(--bg-light)' }}>Monthly Revenue</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {formatCurrency(scenario.monthlyRevenue)}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'white' }}>Monthly Profit</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {formatCurrency(scenario.results?.monthlyProfit || 0)}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'var(--bg-light)' }}>ROI</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {scenario.results?.roi.toFixed(1) || 0}%
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'white' }}>Payback Period</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {scenario.results?.paybackPeriod.toFixed(1) || 0} months
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'var(--bg-light)' }}>5-Year Revenue</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {formatCurrency(scenario.results?.fiveYearProjection?.[4]?.revenue || 0)}
                                </td>
                              ))}
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem', position: 'sticky', left: 0, backgroundColor: 'white' }}>NPV</td>
                              {scenarios.map(scenario => (
                                <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {formatCurrency(scenario.results?.npv || 0)}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Comparative Recommendation</h4>
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.05)',
                          borderLeft: '4px solid var(--primary-main, #3B82F6)',
                          padding: '1rem',
                          borderRadius: '0 0.5rem 0.5rem 0',
                        }}>
                          {(() => {
                            // Find the best scenario based on ROI and payback time
                            const bestScenario = [...scenarios].sort((a, b) => {
                              const aScore = (a.results?.roi || 0) / (a.results?.paybackPeriod || Infinity);
                              const bScore = (b.results?.roi || 0) / (b.results?.paybackPeriod || Infinity);
                              return bScore - aScore;
                            })[0];
                            
                            return (
                              <p>
                                Based on comparative analysis, <strong>{bestScenario.name}</strong> appears to offer the best risk-adjusted return with a {bestScenario.results?.roi.toFixed(1)}% ROI and {bestScenario.results?.paybackPeriod.toFixed(1)} month payback period. This scenario balances growth potential with manageable risk factors.
                              </p>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
              <FontAwesomeIcon icon={faCog} style={{ marginRight: '0.75rem' }} />
              Calculator Settings
            </h2>
            
            <div style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Financial Parameters</h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <div>
                  <ParameterSlider
                    label="Initial Investment"
                    value={investment}
                    onChange={setInvestment}
                    min={10000}
                    max={1000000}
                    step={10000}
                    formatter={formatCurrency}
                  />
                  
                  <ParameterSlider
                    label="Monthly Revenue"
                    value={monthlyRevenue}
                    onChange={setMonthlyRevenue}
                    min={5000}
                    max={200000}
                    step={1000}
                    formatter={formatCurrency}
                  />
                  
                  <ParameterSlider
                    label="Monthly Operating Costs"
                    value={operatingCosts}
                    onChange={setOperatingCosts}
                    min={1000}
                    max={150000}
                    step={1000}
                    formatter={formatCurrency}
                  />
                </div>
                
                <div>
                  <ParameterSlider
                    label="Annual Growth Rate (%)"
                    value={growthRate}
                    onChange={setGrowthRate}
                    min={0}
                    max={30}
                    step={0.5}
                    formatter={(value) => `${value}%`}
                  />
                  
                  <ParameterSlider
                    label="Annual Inflation Rate (%)"
                    value={inflationRate}
                    onChange={setInflationRate}
                    min={0}
                    max={10}
                    step={0.1}
                    formatter={(value) => `${value}%`}
                  />
                  
                  <ParameterSlider
                    label="Tax Rate (%)"
                    value={taxRate}
                    onChange={setTaxRate}
                    min={0}
                    max={40}
                    step={1}
                    formatter={(value) => `${value}%`}
                  />
                  
                  <ParameterSlider
                    label="Discount Rate (%)"
                    value={discountRate}
                    onChange={setDiscountRate}
                    min={0}
                    max={20}
                    step={0.5}
                    formatter={(value) => `${value}%`}
                  />
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'var(--background-card, white)',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ margin: 0 }}>Advanced Settings</h3>
                <div>
                  <button style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1rem',
                    background: 'var(--primary-main, #3B82F6)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => {
                    alert('Settings saved successfully!');
                  }}
                >
                  Save Settings
                </button>
              </div>
              </div>
              
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                Configure business-specific parameters for more accurate projections
              </p>
              
              <CollapsibleSection title="Business Parameters" defaultOpen={true}>
                {businessType === 'cafe' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <ParameterSlider
                      label="Seating Capacity"
                      value={advancedParams.seatingCapacity}
                      onChange={(value) => handleAdvancedParamChange('seatingCapacity', value)}
                      min={10}
                      max={100}
                    />
                    
                    <ParameterSlider
                      label="Average Ticket ($)"
                      value={advancedParams.avgTicket}
                      onChange={(value) => handleAdvancedParamChange('avgTicket', value)}
                      min={5}
                      max={50}
                      step={0.5}
                      formatter={(value) => `$${value.toFixed(2)}`}
                    />
                    
                    <ParameterSlider
                      label="Table Turnover Rate"
                      value={advancedParams.turnoverRate}
                      onChange={(value) => handleAdvancedParamChange('turnoverRate', value)}
                      min={1}
                      max={8}
                      step={0.1}
                      formatter={(value) => value.toFixed(1)}
                    />
                    
                    <ParameterSlider
                      label="Staff Count"
                      value={advancedParams.staffCount}
                      onChange={(value) => handleAdvancedParamChange('staffCount', value)}
                      min={1}
                      max={20}
                    />
                    
                    <ParameterSlider
                      label="Average Staff Wage ($)"
                      value={advancedParams.avgStaffWage}
                      onChange={(value) => handleAdvancedParamChange('avgStaffWage', value)}
                      min={8}
                      max={30}
                      step={0.5}
                      formatter={(value) => `$${value.toFixed(2)}`}
                    />
                    
                    <ParameterSlider
                      label="Food Cost (%)"
                      value={advancedParams.foodCost}
                      onChange={(value) => handleAdvancedParamChange('foodCost', value)}
                      min={15}
                      max={45}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Beverage Cost (%)"
                      value={advancedParams.beverageCost}
                      onChange={(value) => handleAdvancedParamChange('beverageCost', value)}
                      min={10}
                      max={40}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Monthly Rent ($)"
                      value={advancedParams.rent}
                      onChange={(value) => handleAdvancedParamChange('rent', value)}
                      min={1000}
                      max={15000}
                      step={100}
                      formatter={formatCurrency}
                    />
                  </div>
                )}
                
                {businessType === 'retail' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <ParameterSlider
                      label="Square Footage"
                      value={advancedParams.squareFootage}
                      onChange={(value) => handleAdvancedParamChange('squareFootage', value)}
                      min={500}
                      max={5000}
                      step={100}
                    />
                    
                    <ParameterSlider
                      label="Sales per Sq Ft ($)"
                      value={advancedParams.salesPerSqFt}
                      onChange={(value) => handleAdvancedParamChange('salesPerSqFt', value)}
                      min={100}
                      max={1000}
                      step={10}
                      formatter={(value) => `$${value}`}
                    />
                    
                    <ParameterSlider
                      label="Inventory Turnover"
                      value={advancedParams.inventoryTurnover}
                      onChange={(value) => handleAdvancedParamChange('inventoryTurnover', value)}
                      min={1}
                      max={12}
                      step={0.1}
                      formatter={(value) => value.toFixed(1)}
                    />
                    
                    <ParameterSlider
                      label="Shrinkage (%)"
                      value={advancedParams.shrinkage}
                      onChange={(value) => handleAdvancedParamChange('shrinkage', value)}
                      min={0.5}
                      max={5}
                      step={0.1}
                      formatter={(value) => `${value.toFixed(1)}%`}
                    />
                    
                    <ParameterSlider
                      label="Staffing Cost (%)"
                      value={advancedParams.staffingCost}
                      onChange={(value) => handleAdvancedParamChange('staffingCost', value)}
                      min={5}
                      max={30}
                      formatter={(value) => `${value}%`}
                    />
                  </div>
                )}
                
                {businessType === 'service' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <ParameterSlider
                      label="Billable Hours (monthly)"
                      value={advancedParams.billableHours}
                      onChange={(value) => handleAdvancedParamChange('billableHours', value)}
                      min={80}
                      max={250}
                      step={5}
                    />
                    
                    <ParameterSlider
                      label="Hourly Rate ($)"
                      value={advancedParams.hourlyRate}
                      onChange={(value) => handleAdvancedParamChange('hourlyRate', value)}
                      min={50}
                      max={300}
                      step={5}
                      formatter={(value) => `$${value}`}
                    />
                    
                    <ParameterSlider
                      label="Utilization Rate (%)"
                      value={advancedParams.utilizationRate}
                      onChange={(value) => handleAdvancedParamChange('utilizationRate', value)}
                      min={50}
                      max={90}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Overhead Per Employee ($)"
                      value={advancedParams.overheadPerEmployee}
                      onChange={(value) => handleAdvancedParamChange('overheadPerEmployee', value)}
                      min={1000}
                      max={5000}
                      step={100}
                      formatter={formatCurrency}
                    />
                    
                    <ParameterSlider
                      label="Employee Count"
                      value={advancedParams.employeeCount}
                      onChange={(value) => handleAdvancedParamChange('employeeCount', value)}
                      min={1}
                      max={30}
                    />
                  </div>
                )}
                
                {businessType === 'manufacturing' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <ParameterSlider
                      label="Production Capacity"
                      value={advancedParams.productionCapacity}
                      onChange={(value) => handleAdvancedParamChange('productionCapacity', value)}
                      min={1000}
                      max={10000}
                      step={100}
                    />
                    
                    <ParameterSlider
                      label="Material Cost (%)"
                      value={advancedParams.materialCostPercent}
                      onChange={(value) => handleAdvancedParamChange('materialCostPercent', value)}
                      min={20}
                      max={70}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Labor Cost (%)"
                      value={advancedParams.laborCostPercent}
                      onChange={(value) => handleAdvancedParamChange('laborCostPercent', value)}
                      min={10}
                      max={50}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Overhead (%)"
                      value={advancedParams.overheadPercent}
                      onChange={(value) => handleAdvancedParamChange('overheadPercent', value)}
                      min={5}
                      max={30}
                      formatter={(value) => `${value}%`}
                    />
                    
                    <ParameterSlider
                      label="Defect Rate (%)"
                      value={advancedParams.defectRate}
                      onChange={(value) => handleAdvancedParamChange('defectRate', value)}
                      min={0.5}
                      max={10}
                      step={0.1}
                      formatter={(value) => `${value.toFixed(1)}%`}
                    />
                  </div>
                )}
              </CollapsibleSection>
              
              <CollapsibleSection title="Data Management">
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Import / Export</h4>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <button style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1rem',
                        background: 'white',
                        border: '1px solid var(--border-main, #D1D5DB)',
                        borderRadius: '0.375rem',
                        color: 'var(--text-primary, #111827)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        justifyContent: 'center',
                        marginBottom: '0.75rem'
                      }}
                      onClick={() => {
                        alert('Import functionality will be available in the next update.');
                      }}
                      >
                        Import Data (CSV)
                      </button>
                      
                        <button style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1rem',
                        background: 'white',
                        border: '1px solid var(--border-main, #D1D5DB)',
                        borderRadius: '0.375rem',
                        color: 'var(--text-primary, #111827)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        justifyContent: 'center'
                      }}
                      onClick={() => {
                        alert('Export functionality will be available in the next update.');
                      }}
                      >
                        <FontAwesomeIcon icon={faCloudDownloadAlt} />
                        Export Data (CSV)
                      </button>
                    </div>
                    
                    <div>
                      <button style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1rem',
                        background: 'white',
                        border: '1px solid var(--border-main, #D1D5DB)',
                        borderRadius: '0.375rem',
                        color: 'var(--text-primary, #111827)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        justifyContent: 'center',
                        marginBottom: '0.75rem'
                      }}
                      onClick={() => {
                        alert('PDF export functionality will be available in the next update.');
                      }}
                      >
                        <FontAwesomeIcon icon={faFilePdf} />
                        Generate PDF Report
                      </button>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
              
              <p style={{ marginTop: '1.5rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                All calculator settings are saved automatically within your current session. Use the scenario management feature to save different configurations.
              </p>
            </div>
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: theme.backgroundColor || 'var(--background, #f8fafc)'
    }}>
      {/* Sidebar */}
      <CalculatorSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content */}
      <div style={{ 
        flex: 1,
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Style for range inputs */
          input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #e2e8f0;
            outline: none;
          }
          
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary-main, #3B82F6);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }
          
          input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
      <style>
        {`
          input[type=range] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 5px;
            background: #e2e8f0;
            outline: none;
            cursor: pointer;
          }

          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary-main, #3B82F6);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }

          input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          input[type=range]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border: none;
            border-radius: 50%;
            background: var(--primary-main, #3B82F6);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type=range]::-ms-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--primary-main, #3B82F6);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type=range]:hover::-webkit-slider-thumb {
            transform: scale(1.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedDashboard;