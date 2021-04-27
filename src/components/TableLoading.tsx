import useTextColor from 'hooks/useTextColor'
import React, { FC } from 'react'
import Loader from 'react-loader-spinner'

const TableLoading: FC = () => {
  const textColor = useTextColor()

  return (
    <tr>
      <td colSpan={3}>
        <div className="w-full h-80 flex justify-center items-center">
          <Loader type="TailSpin" color={textColor} height={75} width={75} />
        </div>
      </td>
    </tr>
  )
}

export default TableLoading
