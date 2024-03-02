import Board from '@/components/Boards';
import Header from '@/components/Header';
import StateInformation from '@/components/StateInformation';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <StateInformation />
        <Board />
      </main>
    </>
  );
}
