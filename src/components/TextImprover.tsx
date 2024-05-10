"use client";

import { getAnswer } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';

export default function TextImprover() {
    const textInput = useRef<HTMLTextAreaElement>(null);
    const [generation, setGeneration] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function improveText() {
        setLoading(true);
        const { text } = await getAnswer(textInput.current?.value || '');
        setGeneration(text);
        setLoading(false);
    }

    return (
        <div className="flex flex-col gap-2" >
            <Textarea ref={textInput} id="text" className="h-72" placeholder="Enter text to improve" disabled={loading} />
            <Button onClick={improveText} disabled={loading} >Improve</Button>
            { (generation) && <ReactDiffViewer oldValue={textInput.current?.value || ''} newValue={generation} splitView={true} compareMethod={DiffMethod.WORDS} /> }
        </div>
    );
}
