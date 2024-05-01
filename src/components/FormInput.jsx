/* eslint-disable react/prop-types */
export default function FormInput({ field, value, setFieldValue, error, type }) {
    return (
        <div className="flex w-full">
            {error && (
                <div className="text-center p-2 bg-red-700 rounded-lg mr-1 font-bold text-white border border-black relative">
                    X
                </div>
            )}
            <input
                type={type ? type : "text"}
                placeholder={field}
                className="p-2 border border-black rounded-xl w-full"
                value={value}
                onChange={(e) => setFieldValue(field, e.target.value)}
            />
        </div>
    );
}
