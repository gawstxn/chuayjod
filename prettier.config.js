/** @type {import("prettier").Config} */
module.exports = {
  semi: false,               // ไม่ใส่ ; ท้ายบรรทัด (นิยมใน Next.js)
  singleQuote: true,         // ใช้ "..." แทน '...'
  trailingComma: "es5",      // เว้น , ตอนท้าย object/array (ช่วยเวลาพิมพ์เพิ่ม)
  tabWidth: 2,               // เว้น indent 2 ช่อง
  printWidth: 100,           // ความยาวสูงสุดต่อบรรทัด
  bracketSpacing: true,      // { foo: bar } แทน {foo:bar}
  bracketSameLine: false,    // JSX ปิด tag ในบรรทัดใหม่
  arrowParens: "always",     // (x) => ... แทน x => ...
  plugins: [require("prettier-plugin-tailwindcss")], // ✅ เรียง className ของ Tailwind ให้อัตโนมัติ
}