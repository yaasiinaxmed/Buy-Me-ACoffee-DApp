import Image from "next/image";
import styles from "./page.module.css";
import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { BuyMeCoffee } from "../../components/BuyMeCoffee";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100vh",
      marginTop: "2rem",
    }}>
      <h1 style={{marginBottom: "2rem"}}>Buy Me A Coffee</h1>
      <ConnectEmbed
      client={client}
      chain={chain}
      />
      <BuyMeCoffee/>
    </div>
  );
}
