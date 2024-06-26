import MainHeader from '@/components/headers/mainHeader';
import Test from '@/components/test';

export default async function Index() {
  return (
    <>
      <MainHeader />
      <div className="text-3xl">Test</div>
      <Test />
    </>
  );
}
