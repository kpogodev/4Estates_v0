import React from 'react';
import ProfileCard from '../components/dashboard/profile/ProfileCard';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animationVariants';

function Dashboard() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <ProfileCard />
    </motion.div>
  );
}

export default Dashboard;
