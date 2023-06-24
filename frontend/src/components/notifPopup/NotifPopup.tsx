// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectContentState, setNotif } from 'app/content/content';

const NotifPopup = () => {

  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContentState);
  const notif = content.notif;

  const flag = {
    success: "green",
    error: "red",
  }

  useEffect(() => {
    if (notif.state) {
      const timer = setTimeout(() => {
        dispatch(setNotif({ state: false, msg: null, type: null }))
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notif]);

  return (
    <>
      {notif.state && (
        <button className={`fixed top-100 right-4 z-50 rounded-md bg-${flag[notif.type]}-500 px-4 py-2 text-white transition hover:bg-${flag[notif.type]}-600`}>
          <div className="flex items-center space-x-2">
            <span className="text-3xl">
              {notif.type == "success" ?
                <i className="bx bx-check"></i>
                :
                <i className="bx bx-error"></i>
              }
            </span>
            <p className="font-bold">{notif.msg}</p>
          </div>
        </button>
      )}
    </>
  );
};

export default NotifPopup;
