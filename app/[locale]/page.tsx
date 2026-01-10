'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const t = useTranslations('Home');
  const tc = useTranslations('Common');
  const { data: session, status } = useSession();

  const features = [
    {
      icon: 'mdi:image-edit',
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: 'mdi:text-box-edit',
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: 'mdi:palette',
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
    {
      icon: 'mdi:lightning-bolt',
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
    {
      icon: 'mdi:account-multiple',
      title: t('feature5Title'),
      description: t('feature5Desc'),
    },
    {
      icon: 'mdi:history',
      title: t('feature6Title'),
      description: t('feature6Desc'),
    },
  ];

  const useCases = [
    {
      title: t('useCase1Title'),
      description: t('useCase1Desc'),
      icon: 'mdi:shopping',
    },
    {
      title: t('useCase2Title'),
      description: t('useCase2Desc'),
      icon: 'mdi:share-variant',
    },
    {
      title: t('useCase3Title'),
      description: t('useCase3Desc'),
      icon: 'mdi:palette-swatch',
    },
    {
      title: t('useCase4Title'),
      description: t('useCase4Desc'),
      icon: 'mdi:bullhorn',
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-3.5 md:py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 group">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform">
              <iconify-icon
                icon="mdi:image-edit"
                width="100%"
                height="100%"
                class="text-primary-light dark:text-primary-dark"
                style={{ display: 'flex' }}
              ></iconify-icon>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-text-light-primary dark:text-text-dark-primary truncate leading-none">
              <span className="hidden xs:inline">AI Image Editor</span>
              <span className="xs:hidden">AI Editor</span>
            </h1>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            <LocaleSwitcher />
            <ThemeToggle />
            {session ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/history"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base rounded-lg bg-surface dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary hover:bg-surface/80 dark:hover:bg-surface-dark/80 transition-all shadow-sm hover:shadow whitespace-nowrap"
                >
                  <iconify-icon icon="mdi:history" width="18" height="18"></iconify-icon>
                  <span>{tc('history')}</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base rounded-lg bg-primary-light dark:bg-primary-dark text-white hover:opacity-90 transition-all shadow-sm hover:shadow">
                    <iconify-icon icon="mdi:account-circle" width="20" height="20"></iconify-icon>
                    <span className="hidden sm:inline max-w-[120px] truncate">
                      {session.user?.name || session.user?.email}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-2">
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-text-light-primary dark:text-text-dark-primary hover:bg-surface dark:hover:bg-surface-dark rounded-lg transition-colors flex items-center gap-2"
                      >
                        <iconify-icon icon="mdi:logout" width="16" height="16"></iconify-icon>
                        {tc('logout')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center gap-1.5 px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base rounded-lg bg-primary-light dark:bg-primary-dark text-white hover:opacity-90 transition-all shadow-sm hover:shadow whitespace-nowrap"
              >
                <iconify-icon icon="mdi:login" width="18" height="18"></iconify-icon>
                <span>{tc('login')}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-text-light-primary dark:text-text-dark-primary leading-tight">
            {t('title')}
            <br className="hidden sm:block" />
            <span className="text-primary-light dark:text-primary-dark">{t('titleHighlight')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-light-secondary dark:text-text-dark-secondary mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/editor"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary-light dark:bg-primary-dark text-white text-lg font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <iconify-icon icon="mdi:rocket-launch" width="24" height="24"></iconify-icon>
              {t('startEditing')}
            </Link>
            <Link
              href="/examples"
              className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark text-lg font-semibold hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-all"
            >
              {t('viewExamples')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-surface dark:bg-surface-dark">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-text-light-primary dark:text-text-dark-primary">
            {t('featuresTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors"
              >
                <iconify-icon
                  icon={feature.icon}
                  width="48"
                  height="48"
                  class="text-primary-light dark:text-primary-dark mb-4"
                ></iconify-icon>
                <h4 className="text-xl font-semibold mb-2 text-text-light-primary dark:text-text-dark-primary">
                  {feature.title}
                </h4>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-text-light-primary dark:text-text-dark-primary">
            {t('useCasesTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-surface dark:bg-surface-dark text-center hover:scale-105 transition-transform"
              >
                <iconify-icon
                  icon={useCase.icon}
                  width="64"
                  height="64"
                  class="text-primary-light dark:text-primary-dark mx-auto mb-4"
                ></iconify-icon>
                <h4 className="text-lg font-semibold mb-2 text-text-light-primary dark:text-text-dark-primary">
                  {useCase.title}
                </h4>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-light dark:bg-primary-dark">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">{t('ctaTitle')}</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-4 rounded-lg bg-white text-primary-light dark:text-primary-dark text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {tc('signup')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto text-center text-text-light-secondary dark:text-text-dark-secondary">
          <p>{t('footer')}</p>
        </div>
      </footer>
    </div>
  );
}
