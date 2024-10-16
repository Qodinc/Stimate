import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Registrar fuentes personalizadas si es necesario
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#112131",
  },
  project: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#112131",
    textAlign: "right",
    flexDirection: "column",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: 0,
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  dateSection: {
    marginBottom: 30,
    flexDirection: "column",
  },
  invoiceDetails: {
    flexDirection: "column",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#112131",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width:"auto",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
  },
  tableCol: {
    width: "25%",
    flexDirection:"column"
  },
  tableCellHeader: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
  total: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
});

const Invoice = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Cotización</Text>
        <Text style={styles.project}>Tacos Pepe</Text>
        {/* Aquí puedes agregar un logo si lo deseas */}
        {/* <Image style={styles.logo} src="/path-to-your-logo.png" /> */}
      </View>
      <View style={styles.dateSection}>
        <Text style={styles.text}>Fecha: {invoiceData.date}</Text>
        <Text style={styles.text}>No: {invoiceData.invoiceNumber}</Text>
      </View>

      <View style={styles.invoiceInfo}>
        <View style={styles.invoiceDetails}>
          <Text style={styles.text}>Emisor:</Text>
          <Text style={styles.text}>Juan Perez</Text>
          <Text style={styles.text}>Calle Principal, Conocido</Text>
          <Text style={styles.text}>Metropoli,CDMX</Text>
        </View>
        <View style={styles.invoiceDetails}>
          <Text style={styles.text}>Receptor:</Text>
          <Text style={styles.text}>{invoiceData.clientName}</Text>
        </View>
      </View>

      <View>
        <View style={styles.tableColHeader}>
          <Text style={styles.text}>Detalles</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Producto</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Descripción</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Cantidad</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Unidad</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Precio Unitario</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Precio</Text>
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
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: ${invoiceData.total.toFixed(2)}</Text>
    </Page>
  </Document>
);

export default Invoice;
