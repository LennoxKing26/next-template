'use client';

import { Card, CardBody, Image, Button } from '@heroui/react';

interface ResultDisplayProps {
  resultUrl: string;
  onReset: () => void;
}

export function ResultDisplay({ resultUrl, onReset }: ResultDisplayProps) {
  return (
    <Card className="mt-8 bg-content1 border border-default-200 overflow-visible" shadow="lg">
      <CardBody className="p-6 gap-6">
        <div className="flex items-center gap-2 mb-2">
          <iconify-icon icon="mdi:check-decagram" class="text-success text-2xl" />
          <h3 className="text-2xl font-bold">编辑完成</h3>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-default-200 shadow-sm bg-black/5">
          <Image src={resultUrl} alt="Edited result" className="w-full h-auto object-contain max-h-[600px]" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            as="a"
            href={resultUrl}
            download="edited-image.png"
            color="primary"
            size="lg"
            className="flex-1 font-semibold shadow-lg shadow-primary/20"
            startContent={<iconify-icon icon="mdi:download" width="24" />}
          >
            下载图片
          </Button>
          <Button
            variant="flat"
            size="lg"
            className="flex-1 font-semibold"
            onPress={onReset}
            startContent={<iconify-icon icon="mdi:refresh" width="24" />}
          >
            重新编辑
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
