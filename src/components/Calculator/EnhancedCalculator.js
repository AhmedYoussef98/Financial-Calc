import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, RadarChart, 
  Radar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ZAxis
} from 'recharts';
import gsap from 'gsap';

const EnhancedCalculator = () => {
  // State management
  const [activeTab, setActiveTab] = useState('general');
  const [businessType, setBusinessType] = useState('cafe');
  const [investment, setInvestment] = useState(100000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(30000);
  const [operatingCosts, setOperatingCosts] = useState(18000);
  const [results, setResults] = useState(null);
  const [activeChart, setActiveChart] = useState('bar');
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [scenarioName, setScenarioName] = useState('Base Scenario');
  const [scenarios, setScenarios] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [themeColor, setThemeColor] = useState('#1E3A8A');
  
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
    taxRate: 25,
    discountRate: 8,
    growthRate: 5,
    inflationRate: 2.5,
    marketingPercent: 5
  });
  
  // References for animations
  const chartsRef = useRef(null);
  const insightsRef = useRef(null);
  
  const businessTypes = [
    { id: 'cafe', name: 'Café / Restaurant', icon: '☕' },
    { id: 'retail', name: 'Retail Business', icon: '🛍️' },
    { id: 'service', name: 'Service Business', icon: '💼' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  ];
  
  const chartTypes = [
    { id: 'bar', name: 'Bar Chart', icon: '📊' },
    { id: 'line', name: 'Line Chart', icon: '📈' },
    { id: 'area', name: 'Area Chart', icon: '📉' },
    { id: 'pie', name: 'Pie Chart', icon: '🥧' },
    { id: 'radar', name: 'Radar Chart', icon: '🔬' },
    { id: 'scatter', name: 'Scatter Plot', icon: '✨' },
  ];
  
  // Tabs for different calculator aspects
  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'advanced', name: 'Advanced', icon: '🧰' },
    { id: 'projections', name: 'Projections', icon: '🔮' },
    { id: 'scenarios', name: 'Scenarios', icon: '📋' },
    { id: 'insights', name: 'AI Insights', icon: '🧠' },
  ];

  // Calculate results when inputs change
  useEffect(() => {
    calculateResults();
  }, [investment, monthlyRevenue, operatingCosts, businessType, advancedParams]);

  // GSAP animation for charts
  useEffect(() => {
    if (chartsRef.current && results) {
      gsap.from(chartsRef.current.querySelectorAll('.recharts-layer'), {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, [activeChart, results]);

  // GSAP animation for insights
  useEffect(() => {
    if (insightsRef.current && aiInsights) {
      gsap.from(insightsRef.current.querySelectorAll('p, h4, div'), {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [aiInsights]);

  const calculateResults = () => {
    // Calculate basic financials
    const monthlyProfit = monthlyRevenue - operatingCosts;
    const annualProfit = monthlyProfit * 12;
    const roi = (annualProfit / investment) * 100;
    const paybackPeriod = investment / monthlyProfit;
    
    // Business-specific calculations
    let riskFactor = 1.0;
    let growthPotential = advancedParams.growthRate;
    let marketSaturation = 0;
    let competitiveAdvantage = 0;
    let seasonalityImpact = 0;
    
    switch (businessType) {
      case 'cafe':
        riskFactor = 1.2;
        growthPotential = 4 + (advancedParams.seatingCapacity / 50);
        marketSaturation = calculateCafeMarketSaturation();
        competitiveAdvantage = calculateCafeCompetitiveAdvantage();
        seasonalityImpact = 0.2; // 20% variance due to seasons
        break;
      case 'retail':
        riskFactor = 1.1;
        growthPotential = 6 + (advancedParams.inventoryTurnover / 10);
        marketSaturation = calculateRetailMarketSaturation();
        competitiveAdvantage = calculateRetailCompetitiveAdvantage();
        seasonalityImpact = 0.3; // 30% variance due to seasons/holidays
        break;
      case 'service':
        riskFactor = 0.9;
        growthPotential = 8 + (advancedParams.utilizationRate / 20);
        marketSaturation = calculateServiceMarketSaturation();
        competitiveAdvantage = calculateServiceCompetitiveAdvantage();
        seasonalityImpact = 0.15; // 15% variance throughout year
        break;
      case 'manufacturing':
        riskFactor = 1.3;
        growthPotential = 7 + (100 - advancedParams.defectRate) / 20;
        marketSaturation = calculateManufacturingMarketSaturation();
        competitiveAdvantage = calculateManufacturingCompetitiveAdvantage();
        seasonalityImpact = 0.1; // 10% variance
        break;
      default:
        break;
    }
    
    // Adjusted calculations based on advanced parameters
    const adjustedRoi = roi / riskFactor;
    const effectiveTaxRate = advancedParams.taxRate / 100;
    const afterTaxAnnualProfit = annualProfit * (1 - effectiveTaxRate);
    const npv = calculateNPV(afterTaxAnnualProfit, investment, advancedParams.discountRate / 100, 5);
    const irr = calculateIRR(afterTaxAnnualProfit, investment, 5);
    
    // 5-year projections with advanced parameters
    const fiveYearProjection = [];
    let yearlyRevenue = monthlyRevenue * 12;
    let yearlyCosts = operatingCosts * 12;
    
    for (let year = 1; year <= 5; year++) {
      // Apply growth rate with diminishing returns
      const effectiveGrowthRate = growthPotential * Math.pow(0.9, year - 1);
      // Apply inflation to costs
      const effectiveInflationRate = advancedParams.inflationRate;
      
      yearlyRevenue *= (1 + effectiveGrowthRate / 100);
      yearlyCosts *= (1 + effectiveInflationRate / 100);
      
      // Apply seasonality for quarterly breakdowns
      const quarterlyRevenue = [];
      const quarterlyCosts = [];
      
      for (let quarter = 1; quarter <= 4; quarter++) {
        // Seasonal factors vary by business type
        let seasonalFactor = 1;
        if (quarter === 1) seasonalFactor = 1 - (seasonalityImpact * 0.5);
        if (quarter === 2) seasonalFactor = 1 + (seasonalityImpact * 0.2);
        if (quarter === 3) seasonalFactor = 1 - (seasonalityImpact * 0.2);
        if (quarter === 4) seasonalFactor = 1 + (seasonalityImpact * 0.5);
        
        quarterlyRevenue.push({
          quarter: `Q${quarter}`,
          revenue: (yearlyRevenue / 4) * seasonalFactor
        });
        
        quarterlyCosts.push({
          quarter: `Q${quarter}`,
          costs: (yearlyCosts / 4) * (1 + (seasonalFactor - 1) * 0.5) // Costs less affected by seasons
        });
      }
      
      fiveYearProjection.push({
        year,
        revenue: yearlyRevenue,
        costs: yearlyCosts,
        profit: yearlyRevenue - yearlyCosts,
        quarterlyRevenue,
        quarterlyCosts,
        marketSaturation: Math.min(100, marketSaturation + (year * 5)),
        competitiveAdvantage: Math.max(1, competitiveAdvantage - (year * 0.2))
      });
    }
    
    // Monthly breakdown for the first year
    const monthlyBreakdown = [];
    for (let month = 1; month <= 12; month++) {
      // Seasonal monthly factors
      let monthlyFactor = 1;
      // Spring (growth)
      if (month >= 3 && month <= 5) monthlyFactor = 1 + (seasonalityImpact * 0.3);
      // Summer (peak for some businesses)
      if (month >= 6 && month <= 8) monthlyFactor = 1 + (seasonalityImpact * 0.5);
      // Fall (moderate)
      if (month >= 9 && month <= 11) monthlyFactor = 1 + (seasonalityImpact * 0.2);
      // Winter (usually slower except December)
      if (month === 12) monthlyFactor = 1 + (seasonalityImpact * 0.8);
      if (month === 1 || month === 2) monthlyFactor = 1 - (seasonalityImpact * 0.4);
      
      monthlyBreakdown.push({
        month: getMonthName(month),
        revenue: (monthlyRevenue * monthlyFactor),
        costs: (operatingCosts * (1 + (monthlyFactor - 1) * 0.3)),
        profit: (monthlyRevenue * monthlyFactor) - (operatingCosts * (1 + (monthlyFactor - 1) * 0.3))
      });
    }
    
    // Break-even analysis with monthly resolution
    const breakEvenAnalysis = calculateBreakEvenPoint(investment, monthlyRevenue, operatingCosts);
    
    // Financial ratios
    const financialRatios = {
      profitMargin: (monthlyProfit / monthlyRevenue) * 100,
      roic: afterTaxAnnualProfit / investment * 100,
      debtServiceCoverage: monthlyProfit / (investment * 0.02), // Assuming 2% monthly debt service
      cashReserveRatio: (investment * 0.2) / monthlyOperatingExpenses(),
      operatingExpenseRatio: operatingCosts / monthlyRevenue,
    };
    
    // Risk assessment
    const riskAssessment = {
      overall: calculateOverallRisk(),
      market: 3 + Math.random() * 2,
      financial: 2 + Math.random() * 3,
      operational: 1 + Math.random() * 4,
      sensitivity: {
        revenue: calculateSensitivity('revenue'),
        costs: calculateSensitivity('costs'),
        investment: calculateSensitivity('investment')
      }
    };
    
    // Set the results
    setResults({
      monthlyProfit,
      annualProfit,
      roi,
      adjustedRoi,
      paybackPeriod,
      fiveYearProjection,
      monthlyBreakdown,
      breakEvenAnalysis,
      financialRatios,
      riskAssessment,
      npv,
      irr,
      afterTaxAnnualProfit
    });
  };
  
  // Helper functions for business-specific calculations
  const calculateCafeMarketSaturation = () => {
    return 25 + (advancedParams.seatingCapacity / 10);
  };
  
  const calculateCafeCompetitiveAdvantage = () => {
    const margin = 100 - (advancedParams.foodCost + advancedParams.beverageCost);
    return 3 + (margin / 10);
  };
  
  const calculateRetailMarketSaturation = () => {
    return 30 + (advancedParams.salesPerSqFt / 100);
  };
  
  const calculateRetailCompetitiveAdvantage = () => {
    return 4 + (advancedParams.inventoryTurnover / 2);
  };
  
  const calculateServiceMarketSaturation = () => {
    return 20 + (advancedParams.utilizationRate / 5);
  };
  
  const calculateServiceCompetitiveAdvantage = () => {
    return 5 + (advancedParams.hourlyRate / 50);
  };
  
  const calculateManufacturingMarketSaturation = () => {
    return 40 + (advancedParams.productionCapacity / 1000);
  };
  
  const calculateManufacturingCompetitiveAdvantage = () => {
    return 3 + ((100 - advancedParams.defectRate) / 10);
  };
  
  const monthlyOperatingExpenses = () => {
    return operatingCosts;
  };
  
  const calculateOverallRisk = () => {
    let risk = 5; // Base risk
    
    // Adjust based on business type
    if (businessType === 'cafe') risk += 2;
    if (businessType === 'retail') risk += 1.5;
    if (businessType === 'manufacturing') risk += 1;
    if (businessType === 'service') risk -= 1;
    
    // Adjust based on profit margin
    const profitMargin = (monthlyRevenue - operatingCosts) / monthlyRevenue;
    if (profitMargin < 0.1) risk += 2;
    else if (profitMargin > 0.3) risk -= 2;
    
    return Math.min(10, Math.max(1, risk));
  };
  
  const calculateSensitivity = (factor) => {
    const baseProfit = monthlyRevenue - operatingCosts;
    let adjustedProfit;
    
    if (factor === 'revenue') {
      adjustedProfit = (monthlyRevenue * 0.9) - operatingCosts;
    } else if (factor === 'costs') {
      adjustedProfit = monthlyRevenue - (operatingCosts * 1.1);
    } else {
      return 1; // Default
    }
    
    const percentChange = (adjustedProfit - baseProfit) / baseProfit;
    return Math.abs(percentChange);
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
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Get month name
  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[monthNumber - 1];
  };
  
  // Handle changes to advanced parameters
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
      name: scenarioName,
      businessType,
      investment,
      monthlyRevenue,
      operatingCosts,
      advancedParams: { ...advancedParams },
      results: { ...results }
    };
    
    setScenarios([...scenarios, newScenario]);
    
    // Show success message
    alert(`Scenario "${scenarioName}" saved successfully!`);
  };
  
  // Load a saved scenario
  const loadScenario = (scenario) => {
    setBusinessType(scenario.businessType);
    setInvestment(scenario.investment);
    setMonthlyRevenue(scenario.monthlyRevenue);
    setOperatingCosts(scenario.operatingCosts);
    setAdvancedParams(scenario.advancedParams);
    
    // Show success message
    alert(`Scenario "${scenario.name}" loaded successfully!`);
  };
  
  // Generate AI insights
  const generateAIInsights = () => {
    setIsAIAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const insights = {
        summary: generateSummaryInsight(),
        opportunities: generateOpportunities(),
        risks: generateRisks(),
        recommendations: generateRecommendations()
      };
      
      setAiInsights(insights);
      setIsAIAnalyzing(false);
    }, 2000);
  };
  
  // Generate summary insights based on business type and results
  const generateSummaryInsight = () => {
    if (!results) return "";
    
    const profitMargin = results.financialRatios.profitMargin;
    const paybackPeriod = results.paybackPeriod;
    
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
    
    if (paybackPeriod < 12) {
      paybackAssessment = "rapid return on investment";
    } else if (paybackPeriod < 24) {
      paybackAssessment = "reasonable payback period";
    } else if (paybackPeriod < 36) {
      paybackAssessment = "moderate payback timeline";
    } else {
      paybackAssessment = "extended payback duration";
    }
    
    switch (businessType) {
      case 'cafe':
        summary = `Your café concept shows a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${paybackPeriod.toFixed(1)} months. `;
        
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
        summary = `Your retail business model demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${paybackPeriod.toFixed(1)} months. `;
        
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
        summary = `Your service business demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${paybackPeriod.toFixed(1)} months. `;
        
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
        summary = `Your manufacturing operation shows a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${paybackPeriod.toFixed(1)} months. `;
        
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
        summary = `Your business demonstrates a ${profitAssessment} of ${profitMargin.toFixed(1)}% and a ${paybackAssessment} of ${paybackPeriod.toFixed(1)} months.`;
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
    const riskRating = results.riskAssessment.overall;
    
    // Common risks based on financial metrics
    if (results.financialRatios.cashReserveRatio < 1.5) {
      risks.push({
        factor: "Cash Reserve",
        impact: "High",
        description: "Limited cash reserves may create vulnerability to unexpected expenses or revenue fluctuations"
      });
    }
    
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
    
    if (riskRating > 7) {
      risks.push({
        factor: "Overall Risk Profile",
        impact: "High",
        description: "Multiple risk factors compound vulnerability to market changes"
      });
    }
    
    return risks;
  };
  
  // Generate recommendations based on business type and results
  const generateRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    // Financial recommendations based on metrics
    if (results.financialRatios.profitMargin < 15) {
      recommendations.push({
        area: "Profitability",
        action: "Implement strategic pricing review and cost optimization",
        impact: "Potential 3-5% margin improvement within 6 months"
      });
    }
    
    if (results.financialRatios.cashReserveRatio < 2) {
      recommendations.push({
        area: "Cash Management",
        action: "Establish cash reserve fund equal to 3 months of operating expenses",
        impact: "Enhanced resilience to market fluctuations and opportunities"
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
    recommendations.push({
      area: "Technology Investment",
      action: `Implement ${getBusinessSpecificTech(businessType)} to streamline operations`,
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
  
  // Color schemes based on business type
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
  
  // Render appropriate chart based on active chart type
  const renderChart = () => {
    if (!results) return null;
    
    const COLORS = getColors();
    
    switch (activeChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={results.monthlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill={COLORS[0]} />
              <Bar dataKey="costs" name="Costs" fill={COLORS[2]} />
              <Bar dataKey="profit" name="Profit" fill={COLORS[4]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={results.fiveYearProjection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
              <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke={COLORS[0]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="costs" name="Costs" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="profit" name="Profit" stroke={COLORS[4]} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={results.breakEvenAnalysis.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottomRight', offset: 0 }} />
              <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS[4]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS[4]} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="cumulativeProfit" name="Cumulative Profit" stroke={COLORS[4]} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        const monthlyData = [
          { name: 'Revenue', value: monthlyRevenue },
          { name: 'Costs', value: operatingCosts },
          { name: 'Profit', value: monthlyRevenue - operatingCosts }
        ];
        
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={monthlyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'radar':
        const radarData = [
          {
            subject: 'ROI',
            A: (results.roi / 50) * 100, // Scale to 0-100
            fullMark: 100,
          },
          {
            subject: 'Payback',
            A: Math.max(0, 100 - (results.paybackPeriod / 36) * 100), // Scale to 0-100 (lower is better)
            fullMark: 100,
          },
          {
            subject: 'Profit Margin',
            A: results.financialRatios.profitMargin * 2, // Scale to 0-100
            fullMark: 100,
          },
          {
            subject: 'Risk',
            A: Math.max(0, 100 - (results.riskAssessment.overall * 10)), // Scale to 0-100 (lower is better)
            fullMark: 100,
          },
          {
            subject: 'Growth',
            A: results.fiveYearProjection[4].profit / results.fiveYearProjection[0].profit * 25, // Scale to 0-100
            fullMark: 100,
          },
        ];
        
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Performance" dataKey="A" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
        
      case 'scatter':
        const scatterData = results.fiveYearProjection.flatMap(year => {
          return year.quarterlyRevenue.map((q, i) => ({
            x: (year.year - 1) * 4 + i + 1, // Convert to quarter number (1-20)
            y: q.revenue,
            z: year.quarterlyCosts[i].costs,
            name: `Y${year.year}Q${i+1}`
          }));
        });
        
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Quarter" domain={[1, 20]} />
              <YAxis type="number" dataKey="y" name="Revenue" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Costs" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => {
                if (name === 'x') return [`Quarter ${value}`, 'Quarter'];
                if (name === 'y') return [formatCurrency(value), 'Revenue'];
                if (name === 'z') return [formatCurrency(value), 'Costs'];
                return [value, name];
              }} />
              <Legend />
              <Scatter name="Quarterly Performance" data={scatterData} fill={COLORS[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };
  
  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="general-tab">
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>Business Type</label>
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
                    <span>{type.icon}</span> {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
                Initial Investment: {formatCurrency(investment)}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="range" 
                  min="10000" 
                  max="1000000" 
                  step="10000" 
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
                Monthly Revenue: {formatCurrency(monthlyRevenue)}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="1000" 
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
                Monthly Operating Costs: {formatCurrency(operatingCosts)}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="range" 
                  min="1000" 
                  max="150000" 
                  step="1000" 
                  value={operatingCosts}
                  onChange={(e) => setOperatingCosts(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        );
        
      case 'advanced':
        return (
          <div className="advanced-tab">
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
              Fine-tune your analysis with industry-specific parameters
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              {/* Dynamic fields based on business type */}
              {businessType === 'cafe' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Seating Capacity: {advancedParams.seatingCapacity}
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      step="1" 
                      value={advancedParams.seatingCapacity}
                      onChange={(e) => handleAdvancedParamChange('seatingCapacity', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Average Ticket ($): {advancedParams.avgTicket.toFixed(2)}
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="50" 
                      step="0.5" 
                      value={advancedParams.avgTicket}
                      onChange={(e) => handleAdvancedParamChange('avgTicket', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Table Turnover Rate: {advancedParams.turnoverRate.toFixed(1)}
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="8" 
                      step="0.1" 
                      value={advancedParams.turnoverRate}
                      onChange={(e) => handleAdvancedParamChange('turnoverRate', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Staff Count: {advancedParams.staffCount}
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="20" 
                      step="1" 
                      value={advancedParams.staffCount}
                      onChange={(e) => handleAdvancedParamChange('staffCount', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Average Staff Wage ($): {advancedParams.avgStaffWage.toFixed(2)}
                    </label>
                    <input 
                      type="range" 
                      min="8" 
                      max="30" 
                      step="0.5" 
                      value={advancedParams.avgStaffWage}
                      onChange={(e) => handleAdvancedParamChange('avgStaffWage', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Food Cost (%): {advancedParams.foodCost}%
                    </label>
                    <input 
                      type="range" 
                      min="15" 
                      max="45" 
                      step="1" 
                      value={advancedParams.foodCost}
                      onChange={(e) => handleAdvancedParamChange('foodCost', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Beverage Cost (%): {advancedParams.beverageCost}%
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="40" 
                      step="1" 
                      value={advancedParams.beverageCost}
                      onChange={(e) => handleAdvancedParamChange('beverageCost', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Monthly Rent ($): {formatCurrency(advancedParams.rent)}
                    </label>
                    <input 
                      type="range" 
                      min="1000" 
                      max="15000" 
                      step="100" 
                      value={advancedParams.rent}
                      onChange={(e) => handleAdvancedParamChange('rent', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </>
              )}
              
              {businessType === 'retail' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Square Footage: {advancedParams.squareFootage}
                    </label>
                    <input 
                      type="range" 
                      min="500" 
                      max="5000" 
                      step="100" 
                      value={advancedParams.squareFootage}
                      onChange={(e) => handleAdvancedParamChange('squareFootage', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Sales per Sq Ft ($): {advancedParams.salesPerSqFt}
                    </label>
                    <input 
                      type="range" 
                      min="100" 
                      max="1000" 
                      step="10" 
                      value={advancedParams.salesPerSqFt}
                      onChange={(e) => handleAdvancedParamChange('salesPerSqFt', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Inventory Turnover: {advancedParams.inventoryTurnover.toFixed(1)}
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="12" 
                      step="0.1" 
                      value={advancedParams.inventoryTurnover}
                      onChange={(e) => handleAdvancedParamChange('inventoryTurnover', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Shrinkage (%): {advancedParams.shrinkage.toFixed(1)}%
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="5" 
                      step="0.1" 
                      value={advancedParams.shrinkage}
                      onChange={(e) => handleAdvancedParamChange('shrinkage', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Staffing Cost (%): {advancedParams.staffingCost}%
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      step="1" 
                      value={advancedParams.staffingCost}
                      onChange={(e) => handleAdvancedParamChange('staffingCost', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </>
              )}
              
              {businessType === 'manufacturing' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Production Capacity: {advancedParams.productionCapacity}
                    </label>
                    <input 
                      type="range" 
                      min="1000" 
                      max="10000" 
                      step="100" 
                      value={advancedParams.productionCapacity}
                      onChange={(e) => handleAdvancedParamChange('productionCapacity', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Material Cost (%): {advancedParams.materialCostPercent}%
                    </label>
                    <input 
                      type="range" 
                      min="20" 
                      max="70" 
                      step="1" 
                      value={advancedParams.materialCostPercent}
                      onChange={(e) => handleAdvancedParamChange('materialCostPercent', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Labor Cost (%): {advancedParams.laborCostPercent}%
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="50" 
                      step="1" 
                      value={advancedParams.laborCostPercent}
                      onChange={(e) => handleAdvancedParamChange('laborCostPercent', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Overhead (%): {advancedParams.overheadPercent}%
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      step="1" 
                      value={advancedParams.overheadPercent}
                      onChange={(e) => handleAdvancedParamChange('overheadPercent', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Defect Rate (%): {advancedParams.defectRate.toFixed(1)}%
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="10" 
                      step="0.1" 
                      value={advancedParams.defectRate}
                      onChange={(e) => handleAdvancedParamChange('defectRate', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </>
              )}
              
              {businessType === 'service' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Billable Hours (monthly): {advancedParams.billableHours}
                    </label>
                    <input 
                      type="range" 
                      min="80" 
                      max="250" 
                      step="5" 
                      value={advancedParams.billableHours}
                      onChange={(e) => handleAdvancedParamChange('billableHours', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Hourly Rate ($): {advancedParams.hourlyRate}
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="5" 
                      value={advancedParams.hourlyRate}
                      onChange={(e) => handleAdvancedParamChange('hourlyRate', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Utilization Rate (%): {advancedParams.utilizationRate}%
                    </label>
                    <input 
                      type="range" 
                      min="50" 
                      max="90" 
                      step="1" 
                      value={advancedParams.utilizationRate}
                      onChange={(e) => handleAdvancedParamChange('utilizationRate', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Overhead per Employee ($): {formatCurrency(advancedParams.overheadPerEmployee)}
                    </label>
                    <input 
                      type="range" 
                      min="1000" 
                      max="5000" 
                      step="100" 
                      value={advancedParams.overheadPerEmployee}
                      onChange={(e) => handleAdvancedParamChange('overheadPerEmployee', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      Employee Count: {advancedParams.employeeCount}
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="1" 
                      value={advancedParams.employeeCount}
                      onChange={(e) => handleAdvancedParamChange('employeeCount', Number(e.target.value))}
                      style={{ width: '100%' }}
                    />
                  </div>
                </>
              )}
              
              {/* Common parameters for all business types */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Tax Rate (%): {advancedParams.taxRate}%
                </label>
                <input 
                  type="range" 
                  min="15" 
                  max="40" 
                  step="1" 
                  value={advancedParams.taxRate}
                  onChange={(e) => handleAdvancedParamChange('taxRate', Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Discount Rate (%): {advancedParams.discountRate}%
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="15" 
                  step="0.5" 
                  value={advancedParams.discountRate}
                  onChange={(e) => handleAdvancedParamChange('discountRate', Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Growth Rate (%): {advancedParams.growthRate}%
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.5" 
                  value={advancedParams.growthRate}
                  onChange={(e) => handleAdvancedParamChange('growthRate', Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Inflation Rate (%): {advancedParams.inflationRate}%
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="0.1" 
                  value={advancedParams.inflationRate}
                  onChange={(e) => handleAdvancedParamChange('inflationRate', Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  Marketing (%): {advancedParams.marketingPercent}%
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.5" 
                  value={advancedParams.marketingPercent}
                  onChange={(e) => handleAdvancedParamChange('marketingPercent', Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        );
        
      case 'projections':
        return (
          <div className="projections-tab">
            {results && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    {chartTypes.map(chart => (
                      <button 
                        key={chart.id}
                        style={{
                          padding: '0.625rem 1rem',
                          background: activeChart === chart.id ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                          border: activeChart === chart.id ? '2px solid var(--primary)' : '2px solid transparent',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontWeight: activeChart === chart.id ? 600 : 400,
                          color: activeChart === chart.id ? 'var(--primary)' : 'var(--text-dark)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onClick={() => setActiveChart(chart.id)}
                      >
                        <span>{chart.icon}</span> {chart.name}
                      </button>
                    ))}
                  </div>
                  
                  <div ref={chartsRef}>
                    {renderChart()}
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Financial Metrics</h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Monthly Revenue</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{formatCurrency(monthlyRevenue)}</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Monthly Profit</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{formatCurrency(results.monthlyProfit)}</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>ROI</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{results.roi.toFixed(1)}%</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Payback Period</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{results.paybackPeriod.toFixed(1)} months</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Profit Margin</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{results.financialRatios.profitMargin.toFixed(1)}%</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>NPV (5 Years)</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{formatCurrency(results.npv)}</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Year 5 Revenue</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{formatCurrency(results.fiveYearProjection[4].revenue)}</div>
                    </div>
                    
                    <div style={{ 
                      background: 'var(--bg-light)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Risk Rating</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>{results.riskAssessment.overall.toFixed(1)}/10</div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '1rem',
                    marginTop: '1.5rem'
                  }}>
                    <button 
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        padding: '0.75rem 1.5rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onClick={() => setShowDetailedView(!showDetailedView)}
                    >
                      {showDetailedView ? 'Hide Detailed View' : 'Show Detailed View'}
                    </button>
                    
                    <button 
                      style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        padding: '0.75rem 1.5rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onClick={() => {
                        // Simulate export functionality
                        alert('Financial report exported successfully!');
                      }}
                    >
                      Export Report
                    </button>
                  </div>
                  
                  {showDetailedView && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: '2rem' }}
                    >
                      <h3 style={{ marginBottom: '1rem' }}>Detailed Financial Projections</h3>
                      
                      <div style={{ 
                        background: 'var(--bg-light)',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        marginBottom: '1.5rem'
                      }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ 
                              backgroundColor: 'var(--primary)',
                              color: 'white'
                            }}>
                              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Year</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Revenue</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Costs</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Profit</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Growth (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.fiveYearProjection.map((year, index) => (
                              <tr key={index} style={{ 
                                borderBottom: '1px solid #e2e8f0',
                                backgroundColor: index % 2 === 0 ? 'white' : 'var(--bg-light)'
                              }}>
                                <td style={{ padding: '0.75rem' }}>Year {year.year}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(year.revenue)}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(year.costs)}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>{formatCurrency(year.profit)}</td>
                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                  {index === 0 ? 'N/A' : 
                                    `${((year.profit / results.fiveYearProjection[index-1].profit - 1) * 100).toFixed(1)}%`
                                  }
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <h3 style={{ marginBottom: '1rem' }}>Risk Assessment</h3>
                      <div style={{ 
                        background: 'var(--bg-light)',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        marginBottom: '1.5rem'
                      }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ 
                              backgroundColor: 'var(--primary)',
                              color: 'white'
                            }}>
                              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Risk Factor</th>
                              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Rating (1-10)</th>
                              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Impact</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem' }}>Market Risk</td>
                              <td style={{ padding: '0.75rem', textAlign: 'right' }}>{results.riskAssessment.market.toFixed(1)}</td>
                              <td style={{ padding: '0.75rem' }}>
                                {results.riskAssessment.market < 3 ? 'Low' : 
                                  results.riskAssessment.market < 7 ? 'Medium' : 'High'}
                              </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                              <td style={{ padding: '0.75rem' }}>Financial Risk</td>
                              <td style={{ padding: '0.75rem', textAlign: 'right' }}>{results.riskAssessment.financial.toFixed(1)}</td>
                              <td style={{ padding: '0.75rem' }}>
                                {results.riskAssessment.financial < 3 ? 'Low' : 
                                  results.riskAssessment.financial < 7 ? 'Medium' : 'High'}
                              </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.75rem' }}>Operational Risk</td>
                              <td style={{ padding: '0.75rem', textAlign: 'right' }}>{results.riskAssessment.operational.toFixed(1)}</td>
                              <td style={{ padding: '0.75rem' }}>
                                {results.riskAssessment.operational < 3 ? 'Low' : 
                                  results.riskAssessment.operational < 7 ? 'Medium' : 'High'}
                              </td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                              <td style={{ padding: '0.75rem' }}>Overall Risk</td>
                              <td style={{ padding: '0.75rem', textAlign: 'right' }}>{results.riskAssessment.overall.toFixed(1)}</td>
                              <td style={{ padding: '0.75rem' }}>
                                {results.riskAssessment.overall < 3 ? 'Low' : 
                                  results.riskAssessment.overall < 7 ? 'Medium' : 'High'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        );
        
      case 'scenarios':
        return (
          <div className="scenarios-tab">
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Save Current Scenario</h3>
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <input 
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
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
                    cursor: 'pointer'
                  }}
                >
                  Save Scenario
                </button>
              </div>
              
              {scenarios.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Saved Scenarios</h3>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1rem'
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
                        <h4 style={{ marginBottom: '0.5rem' }}>{scenario.name}</h4>
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
                    <div style={{ marginTop: '2rem' }}>
                      <button 
                        onClick={() => setShowComparison(!showComparison)}
                        style={{
                          backgroundColor: 'var(--secondary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          padding: '0.75rem 1.5rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {showComparison ? 'Hide Comparison' : 'Compare Scenarios'}
                      </button>
                      
                      {showComparison && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          style={{ marginTop: '1.5rem' }}
                        >
                          <div style={{ 
                            background: 'white',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                            boxShadow: 'var(--shadow-sm)'
                          }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Metric</th>
                                  {scenarios.map(scenario => (
                                    <th key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>{scenario.name}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <td style={{ padding: '0.75rem' }}>Investment</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {formatCurrency(scenario.investment)}
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                                  <td style={{ padding: '0.75rem' }}>Monthly Revenue</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {formatCurrency(scenario.monthlyRevenue)}
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <td style={{ padding: '0.75rem' }}>Monthly Profit</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {formatCurrency(scenario.results?.monthlyProfit || 0)}
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                                  <td style={{ padding: '0.75rem' }}>ROI</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {scenario.results?.roi.toFixed(1) || 0}%
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <td style={{ padding: '0.75rem' }}>Payback Period</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {scenario.results?.paybackPeriod.toFixed(1) || 0} months
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: 'var(--bg-light)' }}>
                                  <td style={{ padding: '0.75rem' }}>Profit Margin</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {scenario.results?.financialRatios?.profitMargin.toFixed(1) || 0}%
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                  <td style={{ padding: '0.75rem' }}>NPV (5 Years)</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {formatCurrency(scenario.results?.npv || 0)}
                                    </td>
                                  ))}
                                </tr>
                                <tr style={{ backgroundColor: 'var(--bg-light)' }}>
                                  <td style={{ padding: '0.75rem' }}>Risk Rating</td>
                                  {scenarios.map(scenario => (
                                    <td key={scenario.id} style={{ padding: '0.75rem', textAlign: 'right' }}>
                                      {scenario.results?.riskAssessment?.overall.toFixed(1) || 0}/10
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div style={{ marginTop: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Recommendation</h4>
                            <div style={{ 
                              background: 'rgba(37, 99, 235, 0.05)',
                              borderLeft: '4px solid var(--primary)',
                              padding: '1rem',
                              borderRadius: '0 0.5rem 0.5rem 0'
                            }}>
                              {(() => {
                                // Find the best scenario based on ROI and risk
                                const bestScenario = [...scenarios].sort((a, b) => {
                                  const aScore = (a.results?.roi || 0) / (a.results?.riskAssessment?.overall || 5);
                                  const bScore = (b.results?.roi || 0) / (b.results?.riskAssessment?.overall || 5);
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
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'insights':
        return (
          <div className="insights-tab">
            {!aiInsights ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Generate AI Insights</h3>
                <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
                  Our AI will analyze your data and provide detailed insights and recommendations
                </p>
                
                {isAIAnalyzing ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      border: '3px solid #f3f3f3',
                      borderTop: '3px solid var(--primary)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <p>Analyzing your business model...</p>
                  </div>
                ) : (
                  <button 
                    onClick={generateAIInsights}
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
                      gap: '0.5rem',
                      margin: '0 auto'
                    }}
                  >
                    <span>🧠</span> Generate AI Insights
                  </button>
                )}
              </div>
            ) : (
              <div ref={insightsRef}>
                <div style={{ 
                  background: 'rgba(37, 99, 235, 0.05)',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Executive Summary</h3>
                  <p>{aiInsights.summary}</p>
                </div>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ 
                    background: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      background: 'var(--primary)', 
                      color: 'white', 
                      padding: '0.75rem 1.5rem' 
                    }}>
                      <h4 style={{ margin: 0 }}>Key Opportunities</h4>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <ul style={{ 
                        paddingLeft: '1.5rem',
                        marginTop: 0,
                        marginBottom: 0
                      }}>
                        {aiInsights.opportunities.map((opportunity, index) => (
                          <li key={index} style={{ marginBottom: '0.5rem' }}>{opportunity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      background: 'var(--secondary)', 
                      color: 'white', 
                      padding: '0.75rem 1.5rem' 
                    }}>
                      <h4 style={{ margin: 0 }}>Risk Factors</h4>
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Factor</th>
                            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Impact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {aiInsights.risks.map((risk, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                              <td style={{ padding: '0.5rem' }}>{risk.factor}</td>
                              <td style={{ padding: '0.5rem' }}>
                                <span style={{ 
                                  display: 'inline-block',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '0.25rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  backgroundColor: risk.impact === 'High' ? 'rgba(220, 38, 38, 0.1)' : 
                                                  risk.impact === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 
                                                  'rgba(5, 150, 105, 0.1)',
                                  color: risk.impact === 'High' ? '#DC2626' : 
                                         risk.impact === 'Medium' ? '#F59E0B' : 
                                         '#059669'
                                }}>
                                  {risk.impact}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  background: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  marginBottom: '2rem'
                }}>
                  <div style={{ 
                    background: 'var(--accent)', 
                    color: 'var(--bg-dark)', 
                    padding: '0.75rem 1.5rem' 
                  }}>
                    <h4 style={{ margin: 0 }}>Strategic Recommendations</h4>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ textAlign: 'left', padding: '0.75rem' }}>Area</th>
                          <th style={{ textAlign: 'left', padding: '0.75rem' }}>Recommended Action</th>
                          <th style={{ textAlign: 'left', padding: '0.75rem' }}>Potential Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aiInsights.recommendations.map((rec, index) => (
                          <tr key={index} style={{ 
                            borderBottom: index < aiInsights.recommendations.length - 1 ? '1px solid #e2e8f0' : 'none',
                            backgroundColor: index % 2 === 0 ? 'white' : 'var(--bg-light)'
                          }}>
                            <td style={{ padding: '0.75rem', fontWeight: 600 }}>{rec.area}</td>
                            <td style={{ padding: '0.75rem' }}>{rec.action}</td>
                            <td style={{ padding: '0.75rem', color: 'var(--success)' }}>{rec.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => {
                      // Simulate export functionality
                      alert('AI insights report exported successfully!');
                    }}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.75rem 1.5rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Export Full Insights Report
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem 1.5rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: 0 }}>Financial Feasibility Calculator</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: themeColor,
              cursor: 'pointer'
            }}
            onClick={() => setThemeColor('#1E3A8A')}
            ></div>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: '#0F766E',
              cursor: 'pointer'
            }}
            onClick={() => setThemeColor('#0F766E')}
            ></div>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: '#7E22CE',
              cursor: 'pointer'
            }}
            onClick={() => setThemeColor('#7E22CE')}
            ></div>
          </div>
        </div>
      </motion.div>

      <div style={{ 
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        marginBottom: '3rem'
      }}>
        <div style={{ 
          display: 'flex',
          overflow: 'auto',
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: 'var(--bg-light)'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                padding: '1rem 1.5rem',
                background: activeTab === tab.id ? 'white' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? `3px solid ${themeColor}` : 'none',
                borderRight: '1px solid #f0f0f0',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? themeColor : 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span> {tab.name}
            </button>
          ))}
        </div>
        
        <div style={{ padding: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ 
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: 'var(--shadow)',
            padding: '1.5rem',
            borderTop: `4px solid ${themeColor}`
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Monthly Revenue</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: themeColor, marginBottom: '1rem' }}>
              {formatCurrency(monthlyRevenue)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Monthly Profit:</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--success)' }}>
                {formatCurrency(results.monthlyProfit)}
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: 'var(--shadow)',
            padding: '1.5rem',
            borderTop: `4px solid ${themeColor}`
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Return on Investment</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: themeColor, marginBottom: '1rem' }}>
              {results.roi.toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Payback Period:</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: results.paybackPeriod < 24 ? 'var(--success)' : 'var(--error)' }}>
                {results.paybackPeriod.toFixed(1)} months
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: 'var(--shadow)',
            padding: '1.5rem',
            borderTop: `4px solid ${themeColor}`
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Initial Investment</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: themeColor, marginBottom: '1rem' }}>
              {formatCurrency(investment)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>5-Year Growth:</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--success)' }}>
                {((results.fiveYearProjection[4].profit / (results.monthlyProfit * 12) - 1) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
          
          <div style={{ 
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: 'var(--shadow)',
            padding: '1.5rem',
            borderTop: `4px solid ${themeColor}`
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Profit Margin</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700, color: themeColor, marginBottom: '1rem' }}>
              {results.financialRatios.profitMargin.toFixed(1)}%
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Risk Rating:</div>
              <div style={{ 
                fontSize: '1rem', 
                fontWeight: 600, 
                color: results.riskAssessment.overall < 4 ? 'var(--success)' : 
                      results.riskAssessment.overall < 7 ? 'var(--accent)' : 'var(--error)' 
              }}>
                {results.riskAssessment.overall.toFixed(1)}/10
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
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
            background: ${themeColor};
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
          }
          
          input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
          
          input[type=range]:focus {
            outline: none;
          }
          
          input[type=range]:focus::-webkit-slider-thumb {
            box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
          }
          
          /* Scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}
      </style>
    </div>
  );
};

export default EnhancedCalculator;
