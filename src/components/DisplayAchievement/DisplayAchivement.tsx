import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { Achievement } from "../../services/apiService";
import { formatDate } from "../../utils/dateUtils";

const DisplayAchievement: React.FC<{ achivement: Achievement }> = ({
  achivement,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 2 } },
  };

  return (
    <Container
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <Title>{achivement.achievement}</Title>
      {achivement.date && <DateText>{formatDate(achivement.date)}</DateText>}
    </Container>
  );
};

export default DisplayAchievement;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #fdfdfe;
  font-weight: 700;
  text-align: center;
  overflow-wrap: break-word;
`;

const DateText = styled.p`
  color: #fdfdfe;
  text-align: right;
  align-self: flex-end;
`;
