
import "./ChatWindow.css";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import auth from "../../utils/auth";
import { useExistingUserContext } from "../../utils/existingUserContext";


export default function ChatWindow(){
    const [messages,setMessages] = useState([]);
    
}