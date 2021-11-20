import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Cropper() {
  const inputEl = useRef(null);

  return (
    <Layout>
      <PageContainer className="h-full">
        <TransformWrapper
          doubleClick={{ disabled: true }}
          wheel={{ step: "0.9" }}
          minScale={0.1}
          centerZoomedOut={true}
          ref={inputEl}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="tools">
                <button
                  onClick={() => {
                    zoomIn();
                    console.log(inputEl);
                  }}
                >
                  +
                </button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>

              <TransformComponent
                // wrapperStyle={{ width: "100%", height: "100%" }}
                wrapperStyle={{
                  width: "400px",
                  height: "170px",
                  backgroundColor: "rgba(156, 163, 175)",
                }}
              >
                <img
                  className="bg-red-500 object-contain"
                  src="https://firebasestorage.googleapis.com/v0/b/links-a7df4.appspot.com/o/2Atz1MEF86aeALDTHpOSpuusek93%2F4f083e4-77da-0b7c-4ecd-c2c1801c22a?alt=media&token=e627e4e8-3509-41e5-8348-4e6511150a63"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </PageContainer>
    </Layout>
  );
}
