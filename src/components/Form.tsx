import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { zone1DataState, zone2DataState } from '../atoms/atom';

type ZoneType = 'zone1' | 'zone2';

interface IFormInput {
  title: string;
  zone: ZoneType;
}

function Form() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const setZone1Data = useSetRecoilState(zone1DataState);
  const setZone2Data = useSetRecoilState(zone2DataState);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { zone } = data;
    const { title } = data;
    const setZoneData = zone === 'zone1' ? setZone1Data : setZone2Data;
    setZoneData((current) => [...current, { id: Date.now(), name: title }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} />
      <select {...register('zone', { required: true })}>
        <option value='zone1'>zone1</option>
        <option value='zone2'>zone2</option>
      </select>
      <button type='submit'>아이템추가</button>
    </form>
  );
}

export default Form;
