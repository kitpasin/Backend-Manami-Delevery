import React from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import Logo from "./Logo-Wynnsoft-Management.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  image: {
    width: 100,
  },
  contact: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  textContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleLeft: {
    fontSize: 14,
    flex: 1,
    textAlign: "left",
  },
  titleCenter: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  titleRight: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  descriptionLeft: {
    fontSize: 14,
    flex: 1,
    textAlign: "left",
  },
  descriptionCenter: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  descriptionRight: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
});

const PDFFile = ({
  order_number,
  order_date,
  order_list,
  order_delivery_price,
  order_total_price,
}) => {
  const contact = "(+66)-92317-4044, (+855)-78-459-255";
  const lineId = "@manamicafe";
  const mail = "manamicafe56@gmail.com";
  const address =
    "C1-1, C1-2 Ground floor Samaki Meanchey Village, Sangkat O'Chrov, Poipet City, Banteay Meanchey Province";

  const pages = [
    {
      order_number: order_number,
      order_date: order_date,
      order_delivery_price: order_delivery_price,
      order_total_price: order_total_price,
      image: Logo,
      contact: contact,
      lineId: lineId,
      mail: mail,
      address: address,
    },
  ];
  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page key={index} style={styles.body}>
            <Text style={styles.header} fixed></Text>
            <View style={styles.imageContainer}>
              <Image style={styles.image} src={page.image} />
            </View>
            <Text style={styles.contact}>Telephone: {page.contact}</Text>
            <Text style={styles.contact}>Line ID: {page.lineId}</Text>
            <Text style={styles.contact}>Mail: {page.mail}</Text>
            <Text style={styles.address}>Address: {page.address}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.descriptionLeft}>Order: {page.order_number}</Text>
              <Text style={styles.descriptionRight}>Date: {page.order_date}</Text>
            </View>
            <View style={{width: "100%", marginTop: 32}}>
              <View style={styles.textContainer}>
                <Text style={styles.titleLeft}>List</Text>
                <Text style={styles.titleCenter}>Unit</Text>
                <Text style={styles.titleRight}>Price</Text>
              </View>
            </View>
            {order_list?.map((row, index) =>
              row.page_id === 10 ? (
                <View key={index} style={styles.textContainer}>
                  <Text style={styles.descriptionLeft}>Washing {row.title}</Text>
                  <Text style={styles.descriptionCenter}>1</Text>
                  <Text style={styles.descriptionRight}>{row.totalPrice} THB</Text>
                </View>
              ) : row.page_id === 11 ? (
                <View key={index} style={styles.textContainer}>
                  <Text style={styles.descriptionLeft}>
                    Drying {row.title}, {row.default_minutes + row.minutes_add + " Minutes"}
                  </Text>
                  <Text style={styles.descriptionCenter}>1</Text>
                  <Text style={styles.descriptionRight}>{row.totalPrice} THB</Text>
                </View>
              ) : (
                <View key={index} style={styles.textContainer}>
                  <Text style={styles.descriptionLeft}>{row.title}</Text>
                  <Text style={styles.descriptionCenter}>{row.quantity}</Text>
                  <Text style={styles.descriptionRight}>{row.totalPrice} THB</Text>
                </View>
              )
            )}
            <View style={{width: "100%", marginTop: 32}}>
              <View style={styles.textContainer}>
                <Text style={styles.titleLeft}>Delivery</Text>
                <Text style={styles.titleRight}>{page.order_delivery_price} THB</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleLeft}>Total</Text>
                <Text style={styles.titleRight}>{page.order_total_price} THB</Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default PDFFile;
