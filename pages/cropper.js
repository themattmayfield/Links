import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Home() {
  //   return (
  //     <Layout>
  //       <PageContainer>
  //         <ReactCrop
  //           src="https://firebasestorage.googleapis.com/v0/b/links-a7df4.appspot.com/o/2Atz1MEF86aeALDTHpOSpuusek93%2F4f083e4-77da-0b7c-4ecd-c2c1801c22a?alt=media&token=e627e4e8-3509-41e5-8348-4e6511150a63"
  //           crop={crop}
  //           onChange={(newCrop) => setCrop(newCrop)}
  //         />
  //         ;
  //       </PageContainer>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <PageContainer className="h-full">
        <TransformWrapper>
          <TransformComponent>
            <img
              className="bg-red-500"
              src="https://firebasestorage.googleapis.com/v0/b/links-a7df4.appspot.com/o/2Atz1MEF86aeALDTHpOSpuusek93%2F4f083e4-77da-0b7c-4ecd-c2c1801c22a?alt=media&token=e627e4e8-3509-41e5-8348-4e6511150a63"
            />
          </TransformComponent>
        </TransformWrapper>
      </PageContainer>
    </Layout>
  );
}
