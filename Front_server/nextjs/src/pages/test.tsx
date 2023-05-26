/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import HeaderComponent from '../component/header';

export default function Test() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HeaderComponent/>
        <h1>Test Page Router</h1>
    </main>
  )
}
