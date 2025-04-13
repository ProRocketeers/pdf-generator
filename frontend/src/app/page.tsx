import Image from "next/image";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        {/*TODO: Remove or replace this with a proper logo*/}
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Typography variant='h1'>PDF Generator</Typography>
      </Box>
    </Box>
  );
}
