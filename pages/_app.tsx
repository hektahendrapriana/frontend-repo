import "./globals.css";
import { AuthUserProvider } from '../context/AuthUserContext';
import { Provider } from 'react-redux'; 
import { store } from "@/store/store";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
    </Provider>
  )
    
}