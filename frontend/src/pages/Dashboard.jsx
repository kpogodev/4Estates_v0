import React from 'react';
import UserCard from '../components/dashboard/user/UserCard';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animationVariants';

function Dashboard() {
  return (
    <motion.div variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <UserCard />
    </motion.div>
  );
}

export default Dashboard;
