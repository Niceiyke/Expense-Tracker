
interface ButtonProp {
  text: string;
  onsubmit: () => void;
}

const ButtonComponent: React.FC<ButtonProp> = ({ text, onsubmit }) => {
  return (
    <button className="border p-4 rounded bg-green-800" onClick={onsubmit}>
      <p className="text-md text-gray-100">{text}</p>
    </button>
  );
};

export default ButtonComponent