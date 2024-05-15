import userImage from '../../assets/imgs/company_img.png';
// I'm using an existing image. If it was necessary, I would dynamically extract it from the existing row.

const TableCell = (params: any) => {
  if (!params) return null;

  const { value, field } = params;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '100%'
      }}
    >
      <img
        src={userImage}
        style={{ width: '48px', height: '48px' }}
        alt="user_image"
      />
      <p
        style={{
          margin: 0,
          fontFamily: 'Manrope',
          fontSize: '16px',
          fontWeight: field === 'name' ? 800 : 600,
          lineHeight: '24px',
          letterSpacing: '0.2px'
        }}
      >
        {value}
      </p>
    </div>
  );
};

export default TableCell;
