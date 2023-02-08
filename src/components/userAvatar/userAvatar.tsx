import React, { FC } from 'react'
import styles from './user-avatar.module.scss'

const UserAvatar: FC<{ width: number; height: number }> = ({ width = 40, height = 40 }) => {
  return (
    <div className={`${styles['user-avatar']} rounded-circle`}>
      <img
        width={width}
        height={height}
        src="https://s3-alpha-sig.figma.com/img/c7b4/bd5b/68c53fb3e597ec684ae11dbeec7fe0e2?Expires=1676246400&Signature=bXFY9~Y7CzWDLqqXVrYzQEA5rxnCCT3~ZbCww1ryBkJSWiOo3e7IEI7Nb7il6o8pJG1KNRfLw9qy7kcQIJItwUesfEUttIS5L76Z8VFQ4zlfSydu-IoL1wxCVmApnCGBiMGBYF-foELVfZCAVc11Nr-AGB1T4L64AK~6nd7J2QGvPI93QrQFpLokcR8oglMj~LW0zKuJ6i2LiumnNEK5vGR-P73y50TkqRdpPAQLkzixZdlF0ZgTI8Yoc1E5fk83TdM6poAf4OIsDUU3utZ-im~hg4Tr55l5eaT34kklWLWDUAZgALWpfc9asnd7-UJa9kAjTULe7aWGeFPZPCJYQw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        alt="User Avatar"
      />
    </div>
  )
}

export default UserAvatar
