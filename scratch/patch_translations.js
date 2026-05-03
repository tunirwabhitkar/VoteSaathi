const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/lib/translations.ts');
let content = fs.readFileSync(file, 'utf8');

const additions = {
  en: `    navSimulator: 'Form 6 Simulator',
    simTitle: 'Voter Registration Simulator',
    simSubtitle: 'Practice filling out the official Form 6 for inclusion of name in the electoral roll.',
    simStep: 'Step',
    simOf: 'of',
    simCompleted: 'Completed',
    simPart1: 'Part 1',
    simPart1Desc: 'Personal Details',
    simPart2: 'Part 2',
    simPart2Desc: 'Contact & Address',
    simPart3: 'Part 3',
    simPart3Desc: 'Declaration',
    simPrev: 'Previous',
    simNext: 'Next Step',
    simSubmit: 'Submit Form 6',
    simSubmitting: 'Submitting...',
    simSuccessTitle: 'Form 6 Submitted!',
    simSuccessDesc: 'Excellent! In a real scenario, an ERO would verify your details, and you\\'d receive your official EPIC.',
    simAgain: 'Simulate Again',`,
  hi: `    navSimulator: 'फॉर्म 6 सिम्युलेटर',
    simTitle: 'मतदाता पंजीकरण सिम्युलेटर',
    simSubtitle: 'मतदाता सूची में नाम शामिल करने के लिए आधिकारिक फॉर्म 6 भरने का अभ्यास करें।',
    simStep: 'चरण',
    simOf: 'में से',
    simCompleted: 'पूरा हुआ',
    simPart1: 'भाग 1',
    simPart1Desc: 'व्यक्तिगत विवरण',
    simPart2: 'भाग 2',
    simPart2Desc: 'संपर्क और पता',
    simPart3: 'भाग 3',
    simPart3Desc: 'घोषणा',
    simPrev: 'पिछला',
    simNext: 'अगला चरण',
    simSubmit: 'फॉर्म 6 जमा करें',
    simSubmitting: 'जमा किया जा रहा है...',
    simSuccessTitle: 'फॉर्म 6 जमा किया गया!',
    simSuccessDesc: 'बहुत बढ़िया! वास्तविक परिदृश्य में, ERO आपके विवरणों को सत्यापित करेगा, और आपको अपना आधिकारिक EPIC प्राप्त होगा।',
    simAgain: 'फिर से अनुकरण करें',`,
  bn: `    navSimulator: 'ফর্ম 6 সিমুলেটর',
    simTitle: 'ভোটার নিবন্ধন সিমুলেটর',
    simSubtitle: 'ভোটার তালিকায় নাম অন্তর্ভুক্ত করার জন্য অফিসিয়াল ফর্ম 6 পূরণের অনুশীলন করুন।',
    simStep: 'ধাপ',
    simOf: 'এর মধ্যে',
    simCompleted: 'সম্পন্ন',
    simPart1: 'অংশ ১',
    simPart1Desc: 'ব্যক্তিগত বিবরণ',
    simPart2: 'অংশ ২',
    simPart2Desc: 'যোগাযোগ এবং ঠিকানা',
    simPart3: 'অংশ ৩',
    simPart3Desc: 'ঘোষণা',
    simPrev: 'পূর্ববর্তী',
    simNext: 'পরবর্তী ধাপ',
    simSubmit: 'ফর্ম 6 জমা দিন',
    simSubmitting: 'জমা দেওয়া হচ্ছে...',
    simSuccessTitle: 'ফর্ম 6 জমা দেওয়া হয়েছে!',
    simSuccessDesc: 'চমৎকার! বাস্তব ক্ষেত্রে, ERO আপনার বিবরণ যাচাই করবেন, এবং আপনি আপনার অফিসিয়াল EPIC পাবেন।',
    simAgain: 'আবার সিমুলেট করুন',`,
  te: `    navSimulator: 'ఫారం 6 సిమ్యులేటర్',
    simTitle: 'ఓటరు నమోదు సిమ్యులేటర్',
    simSubtitle: 'ఓటరు జాబితాలో పేరు చేర్చడానికి అధికారిక ఫారం 6 నింపడం సాధన చేయండి.',
    simStep: 'దశ',
    simOf: 'లో',
    simCompleted: 'పూర్తయింది',
    simPart1: 'భాగం 1',
    simPart1Desc: 'వ్యక్తిగత వివరాలు',
    simPart2: 'భాగం 2',
    simPart2Desc: 'సంప్రదింపు & చిరునామా',
    simPart3: 'భాగం 3',
    simPart3Desc: 'ప్రకటన',
    simPrev: 'మునుపటి',
    simNext: 'తదుపరి దశ',
    simSubmit: 'ఫారం 6 సమర్పించండి',
    simSubmitting: 'సమర్పిస్తున్నాము...',
    simSuccessTitle: 'ఫారం 6 సమర్పించబడింది!',
    simSuccessDesc: 'అద్భుతం! వాస్తవ దృశ్యంలో, ERO మీ వివరాలను ధృవీకరిస్తారు, మరియు మీరు అధికారిక EPIC పొందుతారు.',
    simAgain: 'మళ్ళీ అనుకరించండి',`,
  mr: `    navSimulator: 'फॉर्म 6 सिम्युलेटर',
    simTitle: 'मतदार नोंदणी सिम्युलेटर',
    simSubtitle: 'मतदार यादीत नाव समाविष्ट करण्यासाठी अधिकृत फॉर्म 6 भरण्याचा सराव करा.',
    simStep: 'पायरी',
    simOf: 'पैकी',
    simCompleted: 'पूर्ण झाले',
    simPart1: 'भाग 1',
    simPart1Desc: 'वैयक्तिक तपशील',
    simPart2: 'भाग 2',
    simPart2Desc: 'संपर्क आणि पत्ता',
    simPart3: 'भाग 3',
    simPart3Desc: 'घोषणा',
    simPrev: 'मागील',
    simNext: 'पुढची पायरी',
    simSubmit: 'फॉर्म 6 जमा करा',
    simSubmitting: 'जमा करत आहे...',
    simSuccessTitle: 'फॉर्म 6 जमा केले!',
    simSuccessDesc: 'उत्कृष्ट! वास्तविक परिस्थितीत, ERO आपल्या तपशीलांची पडताळणी करेल आणि आपल्याला आपले अधिकृत EPIC प्राप्त होईल.',
    simAgain: 'पुन्हा अनुकरण करा',`,
  ta: `    navSimulator: 'படிவம் 6 சிமுலேட்டர்',
    simTitle: 'வாக்காளர் பதிவு சிமுலேட்டர்',
    simSubtitle: 'வாக்காளர் பட்டியலில் பெயரை சேர்க்க அதிகாரப்பூர்வ படிவம் 6 ஐ நிரப்புவதைப் பயிற்சி செய்யுங்கள்.',
    simStep: 'படி',
    simOf: 'இல்',
    simCompleted: 'முடிந்தது',
    simPart1: 'பகுதி 1',
    simPart1Desc: 'தனிப்பட்ட விவரங்கள்',
    simPart2: 'பகுதி 2',
    simPart2Desc: 'தொடர்பு மற்றும் முகவரி',
    simPart3: 'பகுதி 3',
    simPart3Desc: 'அறிவிப்பு',
    simPrev: 'முந்தைய',
    simNext: 'அடுத்த படி',
    simSubmit: 'படிவம் 6 ஐ சமர்ப்பிக்கவும்',
    simSubmitting: 'சமர்ப்பிக்கப்படுகிறது...',
    simSuccessTitle: 'படிவம் 6 சமர்ப்பிக்கப்பட்டது!',
    simSuccessDesc: 'அருமை! நிஜமான சூழ்நிலையில், ERO உங்கள் விவரங்களை சரிபார்ப்பார், நீங்கள் உங்கள் அதிகாரப்பூர்வ EPIC ஐ பெறுவீர்கள்.',
    simAgain: 'மீண்டும் உருவகப்படுத்தவும்',`
};

// We will insert these keys right after "navMap: '...', " or similar in each language block.
// To do this simply, we replace the navMap line with the navMap line + our additions.

function inject(langCode, navMapLine) {
  // Actually, let's just do a simple string replace for each specific language
  
  if (langCode === 'en') content = content.replace(/navMap: 'Polling Stations',/, "navMap: 'Polling Stations',\n" + additions.en);
  if (langCode === 'hi') content = content.replace(/navMap: 'मतदान केंद्र',/, "navMap: 'मतदान केंद्र',\n" + additions.hi);
  if (langCode === 'bn') content = content.replace(/navMap: 'ভোটকেন্দ্র',/, "navMap: 'ভোটকেন্দ্র',\n" + additions.bn);
  if (langCode === 'te') content = content.replace(/navMap: 'పోలింగ్ కేంద్రాలు',/, "navMap: 'పోలింగ్ కేంద్రాలు',\n" + additions.te);
  if (langCode === 'mr') content = content.replace(/navMap: 'मतदान केंद्रे',/, "navMap: 'मतदान केंद्रे',\n" + additions.mr);
  if (langCode === 'ta') content = content.replace(/navMap: 'வாக்குச் சாவடிகள்',/, "navMap: 'வாக்குச் சாவடிகள்',\n" + additions.ta);
}

inject('en');
inject('hi');
inject('bn');
inject('te');
inject('mr');
inject('ta');

fs.writeFileSync(file, content, 'utf8');
console.log('Translations patched!');
