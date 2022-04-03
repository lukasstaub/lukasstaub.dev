import { GetServerSideProps } from "next";
import Link from "next/link";

const SendMail = ({ status }: { status: any }) => {
  return status == "200" ? (
    <div className="bg-color1 w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-2">Thank you!</h1>
      <p className="text-xl text-center">
        Thank you for contacting me.
        <br />
        I&apos;ll get back to you as soon as I can ;)
      </p>

      <Link href="/" passHref>
        <button className="text-color4 text-xl bg-color2 rounded-lg p-3 my-4 text-center mt-12">Home</button>
      </Link>
    </div>
  ) : (
    <div className="bg-color1 w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-2">Sorry!</h1>
      <p className="text-xl text-center">
        Something went horribly wrong!
        <br />
        (HTTP Status: {status})
      </p>

      <Link href="/" passHref>
        <button className="text-color4 text-xl bg-color2 rounded-lg p-3 my-4 text-center mt-12">Home</button>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.status) {
    return { notFound: true };
  }

  return { props: { status: query.status } };
};

export default SendMail;
