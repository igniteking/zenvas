import React, { useMemo, useRef } from "react";

import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";

const RightSideBar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions
  const memoizedContent = useMemo(
    () => (
      <section className='sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 max-sm:hidden'>
        <h3 className=' px-5 pt-4 text-xs uppercase'>Design</h3>
        <span className='mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300'>
          Make changes to canvas as you like
        </span>

        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          placeholder='color'
          attributeType='fill'
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          placeholder='stroke'
          attributeType='stroke'
          handleInputChange={handleInputChange}
        />

        <Export />
      </section>
    ),
    [elementAttributes]
  ); // only re-render when elementAttributes changes

  return memoizedContent;
};

export default RightSideBar;
