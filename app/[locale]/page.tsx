'use client';
import { AlertDialog, Button } from '@heroui/react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher';
import { useRouter, Link } from '@/i18n/navigation'; // ✅ 从这里引
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const examples = [
    {
      actions: {
        cancel: 'Stay Signed In',
        confirm: 'Sign Out',
      },
      body: "You'll need to sign in again to access your account. Any unsaved changes will be lost.",
      classNames: 'bg-accent-soft text-accent-soft-foreground',
      header: 'Sign out of your account?',
      status: 'accent',
      trigger: 'Sign Out',
    },
    {
      actions: {
        cancel: 'Not Yet',
        confirm: 'Mark Complete',
      },
      body: 'This will mark the task as complete and notify all team members. The task will be moved to your completed list.',
      classNames: 'bg-success-soft text-success-soft-foreground',
      header: 'Complete this task?',
      status: 'success',
      trigger: 'Complete Task',
    },
    {
      actions: {
        cancel: 'Keep Editing',
        confirm: 'Discard',
      },
      body: 'You have unsaved changes that will be permanently lost. Are you sure you want to discard them?',
      classNames: 'bg-warning-soft text-warning-soft-foreground',
      header: 'Discard unsaved changes?',
      status: 'warning',
      trigger: 'Discard Changes',
    },
    {
      actions: {
        cancel: 'Cancel',
        confirm: 'Delete Account',
      },
      body: 'This will permanently delete your account and remove all your data from our servers. This action is irreversible.',
      classNames: 'bg-danger-soft text-danger-soft-foreground',
      header: 'Delete your account?',
      status: 'danger',
      trigger: 'Delete Account',
    },
  ] as const;
  // const theme = useTheme();

  const t = useTranslations('Home');
  // const router = useRouter();
  // const goToAbout = () => {
  //   // ✅ 这里写的是“逻辑路径”，不需要自己加 /en /zh-CN
  //   router.push('/test');
  //   // 当前是 /zh-CN，就跳 /zh-CN/about
  //   // 当前是 /en，就跳 /en/about
  // };
  return (
    <div className="flex flex-wrap gap-4">
      <LocaleSwitcher />
      <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
      <p>{t('desc')}</p>
      <h1 className="text-2xl text-primary-light dark:text-primary-dark">Alert Dialog(ಡωಡ)hiahiahia</h1>
      <ThemeToggle />
      {/* {theme} */}
      {/* 使用 Link 的跳转方式（推荐用于导航） */}
      <div className="flex items-center gap-2 flex-wrap">
        <Link href="/test" className="underline text-blue-500">
          去 Test 页面（Link）
        </Link>
        <Link href="/examples" className="underline text-blue-500">
          去示例页面（Zustand & ahooks）
        </Link>

        {/* 使用 useRouter 的编程式跳转 */}
        {/* <Button onPress={goToAbout} variant="primary"> */}
        {/* 去 Test 页面（router.push） */}
        {/* </Button> */}
      </div>

      {examples.map(({ actions, body, classNames, header, status, trigger }) => (
        <AlertDialog key={status}>
          <Button className={classNames}>{trigger}</Button>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({ close }) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status={status} />
                    <AlertDialog.Heading>{header}</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>{body}</p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      {actions.cancel}
                    </Button>
                    <Button variant={status === 'danger' ? 'danger' : 'primary'} onPress={close}>
                      {actions.confirm}
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
}
