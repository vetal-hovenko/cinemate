import moment from "moment";
import React, { memo } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";

interface DatePickerProps {
    isVisible: boolean;
    onConfirm: (date: Date) => Promise<void>;
    onCancel: () => void;
    date?: Date;
}

const DatePicker = (props: DatePickerProps) => {
    const { date, isVisible, onCancel, onConfirm } = props;

    return (
        <DateTimePicker
            date={date}
            isVisible={isVisible}
            onConfirm={onConfirm}
            onCancel={onCancel}
            mode="date"
            maximumDate={moment().toDate()}
        />
    );
};

export default memo(DatePicker);
