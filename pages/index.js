import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-blue-500 text-2xl my-4 font-bold text-center">Lista de Productos</h1>
      <div key={1} className="shadow-lg rounded-md p-2 text-center border">
        <Image className="rounded-md" width={300} height={300} src={"https://placeimg.com/400/225/arch"} />
        <p>Nombre: Proucto 1</p>
        <p>Precio: 100 $</p>
        <div>
          <PayPalScriptProvider
            options={{
              "client-id": "AWt58x-Hh7UieuvxWuAz6tSJP5m_a1hunFdPPkUK9pyZjBejI4CtFEGQ3AAUxq4TepJMDkKPiV9xYg4n",
            }}
          >
            <PayPalButtons
              createOrder={async () => {
                try {
                  const res = await axios({
                    url: "http://localhost:3000/api/payment",
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  return res.data.id;
                } catch (error) {
                  console.log(error);
                }
              }}
              onCancel={(data) => console.log("compra cancelada")}
              onApprove={(data, actions) => {
                console.log(data);
                actions.order.capture();
              }}
              style={{ layout: "horizontal", color: "blue" }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}
