import { useState } from "react";
import { css } from "@emotion/react";
import useMyMission from "@/hook/useMyMisson";
import { Modal } from "../modal";

interface CalendarProps {
  dataForDates?: Record<string, string>;
}

const Calendar: React.FC<CalendarProps> = ({ dataForDates }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateState, setSelectedDateState] = useState<String>();

  const { missionData } = useMyMission();

  // 날짜에 데이터가 있는지 확인
  const isDateWithData = (date: Date) => {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return missionData?.some((mission) => mission.date === dateString) ?? false;
  };

  // 날짜 선택
  const handleDateClick = async (date: Date) => {
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const isWithData = isDateWithData(date);
    if (isWithData) {
      setSelectedDateState(dateString);
      setShowModal(true);
    }
  };

  // 월 선택
  const handleMonthChange = (increment: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1
    );
    setCurrentDate(newDate);
    setSelectedDateState("");
    setShowModal(false);
  };

  // 오늘로 이동
  const handleGoToToday = () => {
    setCurrentDate(new Date());
    setSelectedDateState("");
    setShowModal(false);
  };

  // 날짜 스타일 변경
  const getDateCellStyle = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const isSelectedDate = selectedDateState
      ? date.toDateString() === selectedDateState
      : false;
    const isWithData = isDateWithData(date);

    return {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isWithData ? "#DCEFD7" : "",
      color: isToday ? "black" : isSelectedDate ? "#009436" : "#A0A0A0",
      fontWeight: isToday ? "bold" : isSelectedDate ? "bold" : "normal",
      borderRadius: "50%",
    };
  };

  // 달력 렌더링
  const renderCalendar = () => {
    const today = currentDate;

    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    ).getDay();

    const calendar: JSX.Element[] = [];

    let dayCounter = 1;

    calendar.push(
      <tr key="header" css={WeekdayStyle}>
        {["일", "월", "화", "수", "목", "금", "토"].map((week, index) => (
          <th key={index}>{week}</th>
        ))}
      </tr>
    );

    for (let i = 0; i < 6; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        const dayDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          dayCounter
        );

        const isCurrentMonth =
          dayCounter <= daysInMonth && (i > 0 || j >= firstDayOfMonth);

        row.push(
          <td
            key={`${i}-${j}`}
            onClick={() => handleDateClick(dayDate)}
            style={isCurrentMonth ? getDateCellStyle(dayDate) : {}}
          >
            {isCurrentMonth ? dayCounter++ : ""}
          </td>
        );
      }

      calendar.push(
        <tr css={DayStyle} key={i}>
          {row}
        </tr>
      );

      if (dayCounter > daysInMonth) {
        break;
      }
    }

    return (
      <table css={WrapperStyle}>
        <thead>
          <tr>
            <th colSpan={7}>
              <button css={MonthStyle} onClick={() => handleMonthChange(-1)}>
                이전 달
              </button>
              <button
                css={CurrentMonthStyle}
                onClick={() => handleGoToToday()}
              >{` ${today.toLocaleString("default", { month: "long", year: "numeric" })} `}</button>
              <button css={MonthStyle} onClick={() => handleMonthChange(1)}>
                다음 달
              </button>
            </th>
          </tr>
        </thead>
        <tbody css={CalenderWrapperStyle}>{calendar}</tbody>
      </table>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {renderCalendar()}
      {showModal && missionData && (
        <Modal
          closeModal={() => setShowModal(false)}
          missionData={
            missionData.filter(
              (mission) => mission.date === selectedDateState
            ) ?? []
          }
        />
      )}
    </div>
  );
};

const WrapperStyle = css({
  width: "365px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

const CurrentMonthStyle = css({
  textAlign: "center",
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "20px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "#000000",
  padding: "10px",
});

const MonthStyle = css({
  textAlign: "center",
  fontSize: "16px",
  marginBottom: "20px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "#D9D9D9",
  padding: "10px",
});

const CalenderWrapperStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const WeekdayStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  fontSize: "20px",
  color: "#A0A0A0",
});

const DayStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  textAlign: "center",
  fontSize: "20px",
  color: "#A0A0A0",
  padding: "10px",
  cursor: "pointer",
});

export default Calendar;
