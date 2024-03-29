import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGTabLike = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M20.945.125c-2.662 0-4.992 1.145-6.445 3.08C13.047 1.27 10.717.125 8.055.125A8.001 8.001 0 0 0 .063 8.117c0 9.024 13.379 16.328 13.948 16.63a1.031 1.031 0 0 0 .978 0c.57-.302 13.948-7.606 13.948-16.63A8.001 8.001 0 0 0 20.945.125ZM14.5 22.658c-2.354-1.372-12.375-7.62-12.375-14.54a5.937 5.937 0 0 1 5.93-5.93c2.507 0 4.612 1.335 5.491 3.48a1.032 1.032 0 0 0 1.908 0c.879-2.149 2.984-3.48 5.491-3.48a5.938 5.938 0 0 1 5.93 5.93c0 6.91-10.024 13.167-12.375 14.54Z"
    />
  </Svg>
)
export default SVGTabLike
