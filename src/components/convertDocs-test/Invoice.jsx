import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Registrar fuentes personalizadas si es necesario
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#112131'
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 0,
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  invoiceDetails: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#112131',
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  total: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const Invoice = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Factura</Text>
        {/* Aquí puedes agregar un logo si lo deseas */}
        {/* <Image style={styles.logo} src="/path-to-your-logo.png" /> */}
      </View>
      
      <View style={styles.invoiceInfo}>
        <View style={styles.invoiceDetails}>
          <Text style={styles.label}>Número de Factura:</Text>
          <Text style={styles.value}>{invoiceData.invoiceNumber}</Text>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{invoiceData.date}</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{invoiceData.clientName}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Descripción</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Cantidad</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Precio Unitario</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Total</Text>
          </View>
        </View>
        {invoiceData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.description}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: ${invoiceData.total.toFixed(2)}</Text>
    </Page>
  </Document>
);

export default Invoice;