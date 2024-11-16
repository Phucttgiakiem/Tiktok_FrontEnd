import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';

function usePassToggle() {
    const [visible, setVisblity] = useState(false);
    const Icon = <FontAwesomeIcon icon={visible ? faEyeSlash : faEye}
    onClick={() => setVisblity(visiblity => !visiblity)} />;
    const InputType = visible ? 'text' : 'password';
    return [InputType, Icon];
}
export default usePassToggle;
