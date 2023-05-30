/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import HeaderComponent from '../component/header';

export default function Test2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HeaderComponent/>
        <h2>Test Page Two</h2>
        <h1>Test2 Page Router</h1>
    </main>
  )
}
