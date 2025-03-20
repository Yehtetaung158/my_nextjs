import React from 'react'
import SettingCard from './settingCard'
import { Card } from '../ui/card'
import { Key } from 'lucide-react'

const ChangePassword = () => {
  return (
    <Card className=' flex items-center justify-between px-2 py-4 w-full'>
        <div>ChangePassword</div>
        <Key className='w-4 h-4'/>
    </Card>
  )
}

export default ChangePassword