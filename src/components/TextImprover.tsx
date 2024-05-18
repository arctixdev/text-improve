"use client";

import { getAnswer } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useRef, useState } from "react";
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

export default function TextImprover() {
    const textInput = useRef<HTMLTextAreaElement>(null);
    const [generation, setGeneration] = useState<string | null>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function improveText() {
        setLoading(true);
        setGeneration(null);
        const { text } = await getAnswer(textInput.current?.value || '');
        setGeneration(text);
        setLoading(false);
    }

    function copyGeneration() {
        if (!generation) return;
        navigator.clipboard.writeText(generation);
    }

    return (
        <div className="flex flex-col gap-2" >
            <Textarea ref={textInput} id="text" className="h-72" placeholder="Enter text to improve" disabled={loading} />
            <div className="flex flex-row gap-2">
                <Button onClick={improveText} disabled={loading} className="w-full">Improve</Button>
                { generation && <Button onClick={copyGeneration}><Copy/></Button> }
            </div>
            { generation && <ReactDiffViewer oldValue={textInput.current?.value || ''} newValue={generation} splitView={true} compareMethod={DiffMethod.WORDS} /> }
        </div>
    );
}
