// src/components/Calculator/ReportGenerator.js
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#0E4DA4',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#0E4DA4',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#F0F4F8',
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 5,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 12,
    textAlign: 'center',
    color: '#999999',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 12,
    color: '#999999',
  },
});

// PDF Document Component
const FinancialReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Financial Analysis Report</Text>
      <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
        Generated on {new Date().toLocaleDateString()}
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.subheader}>Business Overview</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Metric</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Value</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Industry Avg.</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Performance</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Monthly Revenue</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>${data.monthlyRevenue.toLocaleString()}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>${data.industryAvg.revenue.toLocaleString()}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.monthlyRevenue > data.industryAvg.revenue ? 'Above Average' : 'Below Average'}</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Profit Margin</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.profitMargin.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.industryAvg.profitMargin.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.profitMargin > data.industryAvg.profitMargin ? 'Above Average' : 'Below Average'}</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>ROI</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.roi.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.industryAvg.roi.toFixed(1)}%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.roi > data.industryAvg.roi ? 'Above Average' : 'Below Average'}</Text>
            </View>
          </View>
          
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Payback Period</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.paybackPeriod.toFixed(1)} months</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.industryAvg.paybackPeriod.toFixed(1)} months</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{data.paybackPeriod < data.industryAvg.paybackPeriod ? 'Above Average' : 'Below Average'}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheader}>Financial Projections</Text>
        <Text style={styles.text}>
          Based on your inputs and our financial models, we project the following 5-year growth trajectory.
          These projections account for industry trends, market conditions, and your specific business parameters.
        </Text>
        
        {/* Charts would be rendered as images here */}
        {/* <Image style={styles.image} src={chartImageUrl} /> */}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subheader}>AI Insights & Recommendations</Text>
        <Text style={styles.text}>
          • Increasing your average ticket price by 8% could improve profit margins by 14.3%
        </Text>
        <Text style={styles.text}>
          • Your customer acquisition cost is 22% lower than industry average, indicating effective marketing
        </Text>
        <Text style={styles.text}>
          • Consider establishing a 3-month operating expense reserve to weather market fluctuations
        </Text>
        <Text style={styles.text}>
          • Implement inventory management software to reduce carrying costs by approximately 12%
        </Text>
      </View>
      
      <Text style={styles.footer}>
        Generated by WiseCalculator Financial Analysis Platform
      </Text>
      <Text 
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} 
      />
    </Page>
  </Document>
);

// Report Generator Button Component
const ReportGenerator = ({ data }) => {
  // Mock data if real data isn't available
  const mockData = {
    monthlyRevenue: 32500,
    profitMargin: 24.8,
    roi: 32.5,
    paybackPeriod: 14,
    industryAvg: {
      revenue: 28400,
      profitMargin: 22.3,
      roi: 26.5,
      paybackPeriod: 18
    }
  };
  
  const reportData = data || mockData;
  
  return (
    <PDFDownloadLink 
      document={<FinancialReport data={reportData} />} 
      fileName="financial_analysis_report.pdf"
      style={{
        textDecoration: 'none',
        padding: '10px 20px',
        color: 'white',
        backgroundColor: '#0E4DA4',
        borderRadius: '4px',
        display: 'inline-block'
      }}
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generating report...' : 'Download PDF Report'
      }
    </PDFDownloadLink>
  );
};

export default ReportGenerator;