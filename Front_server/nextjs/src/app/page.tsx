/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import HeaderComponent from '../component/header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <HeaderComponent/>
        <img src="/char03.png" alt="Landscape picture"/>
        <h1>Front Server AWS Test Page</h1>
        <p>무중단 배포 완료2332</p>
        <p>커밋 테스트</p>
        <Link href="/test">
          About
        </Link>
    </main>
  )
}
