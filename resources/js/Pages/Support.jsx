import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import {
  faWallet,
  faArrowLeft,
  faHeadset,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faQuestionCircle,
  faClock,
  faComments,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import Textarea from '@/Components/Textarea';
import { useState, useEffect } from 'react';

export default function Support({ auth }) {
  const { flash } = usePage().props;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (flash?.success) {
      setShowSuccessModal(true);
    }
  }, [flash]);

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('contact-form.submit'), {
      onFinish: () => reset('name', 'email', 'subject', 'message'),
    });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] selection:bg-indigo-500 selection:text-white">
      <Head title="Support - EMIPro" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 text-white">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                EMI<span className="text-indigo-600">Pro</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={route('welcome')}
                className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40">
              <FontAwesomeIcon icon={faHeadset} className="text-3xl text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Help?</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our dedicated support team is here to assist you with any questions or issues you may have.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl mb-4 mx-auto">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Get help via email
              </p>
              <a href="mailto:support@emipro.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                support@emipro.com
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 text-2xl mb-4 mx-auto">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Talk to our team
              </p>
              <a href="tel:+15551234567" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl mb-4 mx-auto">
                <FontAwesomeIcon icon={faComments} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Chat with us now
              </p>
              <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Start Chat
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 text-2xl mb-4 mx-auto">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Come say hello
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                123 Finance Street, NY
              </p>
            </div>
          </div>

          {/* Support Hours */}
          <div className="mb-16">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faClock} className="text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Support Hours</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Monday - Friday</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">9:00 AM - 8:00 PM EST</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Saturday - Sunday</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">10:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Quick answers to common questions</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How do I add a new loan?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Navigate to your dashboard and click the "Add New Loan" button. Fill in the required details including loan amount, interest rate, and tenure. Our system will automatically calculate your EMI schedule.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Can I track multiple loans?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes! EMIPro allows you to track unlimited loans across different categories including home loans, car loans, personal loans, and more. Each loan is managed separately with its own payment schedule.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How secure is my financial data?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We use bank-level 256-bit SSL encryption to protect all your data. Your information is stored securely and never shared with third parties without your explicit consent. We also perform regular security audits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Do you offer a mobile app?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store. All features available on the web platform are also available on mobile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We accept all major credit cards, debit cards, and digital payment methods including PayPal, Google Pay, and Apple Pay. All transactions are processed securely through our payment partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 text-center">Still Need Help?</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Send us a message and we'll get back to you within 24 hours</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <InputLabel htmlFor="name" value="Full Name" className="font-bold text-gray-700 dark:text-gray-300" />

                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    placeholder="John Doe"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                  />

                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="email" value="Email" className="font-bold text-gray-700 dark:text-gray-300" />
                  <TextInput
                    id="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="subject" value="Subject" className="font-bold text-gray-700 dark:text-gray-300" />
                  <TextInput
                    id="subject"
                    name="subject"
                    value={data.subject}
                    className="mt-1 block w-full"
                    placeholder="How can we help?"
                    autoComplete="subject"
                    isFocused={true}
                    onChange={(e) => setData('subject', e.target.value)}
                  />
                  <InputError message={errors.subject} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="message" value="Message" className="font-bold text-gray-700 dark:text-gray-300" />
                  <Textarea
                    id="message"
                    name="message"
                    value={data.message}
                    className="mt-1 block w-full"
                    placeholder="Tell us more about your question or issue..."
                    autoComplete="message"
                    isFocused={true}
                    onChange={(e) => setData('message', e.target.value)}
                  />
                  <InputError message={errors.message} className="mt-2" />
                </div>

                <PrimaryButton
                  className="w-full justify-center py-4 rounded-2xl text-lg font-black shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 active:scale-[0.98] transition-all"
                  disabled={processing}
                >
                  Send Message
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-12 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white uppercase">
              EMI<span className="text-indigo-600">Pro</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EMIPro Finance Tracking. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold text-gray-600 dark:text-gray-400">
            <Link href={route('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</Link>
            <Link href={route('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</Link>
            <Link href={route('support')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</Link>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onClose={closeModal} maxWidth="md">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-xl shadow-green-200 dark:shadow-green-900/40 animate-bounce">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-white" />
          </div>

          {/* Success Title */}
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
            Message Sent <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Successfully!</span>
          </h2>

          {/* Success Message */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {flash?.success}
          </p>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:from-indigo-700 hover:to-purple-700 transition-all hover:-translate-y-1 active:scale-95"
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>
    </div>
  );
}
